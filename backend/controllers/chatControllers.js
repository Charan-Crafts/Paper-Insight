require("dotenv").config()
const axios = require("axios");
const { PDFParse } = require("pdf-parse");   // DO NOT TOUCH ✔
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// ------------------ OpenRouter Embedding Function --------------------
async function getEmbeddings(texts) {
    try {
        // OpenRouter requires individual requests for each text
        const embeddings = await Promise.all(
            texts.map(async (text) => {
                const response = await axios.post(
                    'https://openrouter.ai/api/v1/embeddings',
                    {
                        model: "text-embedding-3-small", // or "text-embedding-ada-002"
                        input: text
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                return response.data.data[0].embedding;
            })
        );
        return embeddings;
    } catch (error) {
        console.error('❌ Embedding Error:', error.response?.data || error.message);
        throw error;
    }
}

// ------------------ Main Handler --------------------
const fetchTextFromPdf = async (req, res) => {
    const { pdf_url } = req.body;

    if (!pdf_url) {
        return res.status(400).json({ error: "PDF URL is required" });
    }

    try {
        // 1) Fetch PDF text (DO NOT TOUCH ✔)
        const parser = new PDFParse({ url: pdf_url });
        const result = await parser.getText();
        await parser.destroy();

        const text = result.text;

        // 2) Split text into chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docs = await textSplitter.createDocuments([text]);

        // 3) Generate embeddings using OpenRouter
        const texts = docs.map(doc => doc.pageContent);
        
        console.log(`📊 Generating embeddings for ${texts.length} chunks...`);
        
        const vectors = await getEmbeddings(texts);

        console.log(`✅ Generated ${vectors.length} embeddings`);
        console.log(`📏 Embedding dimension: ${vectors[0]?.length || 'N/A'}`);

        // 4) Combine chunks with embeddings
        const chunksWithEmbeddings = docs.map((doc, index) => ({
            pageContent: doc.pageContent,
            metadata: doc.metadata,
            embedding: vectors[index]
        }));

        return res.status(200).json({
            success: true,
            totalChunks: docs.length,
            embeddingDimension: vectors[0]?.length || 0,
            chunks: chunksWithEmbeddings
        });

    } catch (error) {
        console.error("❌ PDF Processing Error:", error);
        return res.status(500).json({ 
            error: "Failed to process PDF",
            message: error.message 
        });
    }
};

module.exports = { fetchTextFromPdf };
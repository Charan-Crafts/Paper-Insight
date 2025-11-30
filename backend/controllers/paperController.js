const axios = require("axios");
const xml2js = require("xml2js");

const paperModel = require("../models/paperModel");

const getPapers = async (req, res) => {
    const query = req.query.researchField || "machine learning";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const start = (page - 1) * limit;

    console.log("Research Field:", query, "Page:", page);

    try {
        const url = `${process.env.ARXIV_API_URL}?search_query=all:${encodeURIComponent(query)}&start=${start}&max_results=${limit}`;

        const response = await axios.get(url);

        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(response.data);

        const entries = result.feed.entry || [];

        const papers = Array.isArray(entries)
            ? entries.map((item) => ({
                id: item.id,
                title: item.title,
                abstract: item.summary,
                published: item.published,
                authors: Array.isArray(item.author)
                    ? item.author.map((a) => a.name)
                    : [item.author?.name],

                pdf_url:
                    item.link &&
                    item.link.find((l) => l.$.type === "application/pdf")?.$.href,

                category:
                    item.category?.map
                        ? item.category.map((c) => c.$.term)
                        : item.category?.$.term || [],
            }))
            : [];

        return res.status(200).json({
            success: true,
            message: "Papers fetched successfully",
            page,
            limit,
            data: papers,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch papers",
        });
    }
};

// {
//             "id": "http://arxiv.org/abs/2307.16348v2",
//             "title": "Rating-based Reinforcement Learning",
//             "abstract": "This paper develops a novel rating-based reinforcement learning approach that uses human ratings to obtain human guidance in reinforcement learning. Different from the existing preference-based and ranking-based reinforcement learning paradigms, based on human relative preferences over sample pairs, the proposed rating-based reinforcement learning approach is based on human evaluation of individual trajectories without relative comparisons between sample pairs. The rating-based reinforcement learning approach builds on a new prediction model for human ratings and a novel multi-class loss function. We conduct several experimental studies based on synthetic ratings and real human ratings to evaluate the effectiveness and benefits of the new rating-based reinforcement learning approach.",
//             "published": "2023-07-30T23:54:22Z",
//             "authors": [
//                 "Devin White",
//                 "Mingkang Wu",
//                 "Ellen Novoseller",
//                 "Vernon J. Lawhern",
//                 "Nicholas Waytowich",
//                 "Yongcan Cao"
//             ],
//             "pdf_url": "https://arxiv.org/pdf/2307.16348v2",
//             "category": [
//                 "cs.LG",
//                 "cs.AI",
//                 "cs.RO"
//             ]
//         },
const savedPaper = async (req, res) => {

    const { id, title, authors, abstract, pdf_url, category, published } = req.body;

    const userId = req.user.userId;

    console.log(userId)

    try {
        const paper = new paperModel({
            paperId: id,
            title,
            authors,
            abstract,
            pdf_url,
            category,
            published,
            userId: userId
        })
        await paper.save();
        return res.status(200).json({
            success: true,
            message: "Paper saved successfully",
            data: paper
        });
    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to save paper",
        });
    }
}

const removeSavedPaper = async(req,res)=>{
    const {paperId} = req.body;

    const userId = req.user.userId;

    try {
        const deletedPaper = await paperModel.findOneAndDelete({_id:paperId,userId});

        return res.status(200).json({
            success: true,
            message: "Paper removed successfully",
            data: deletedPaper
        }); 
    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to remove paper",
        });
        
    }
}

const viewPaper = async(req,res)=>{

    const {paperId} = req.params;

    const userId = req.user.userId;

   
    try {

        const paper = await paperModel.findOne({_id:paperId,userId});

        return res.status(200).json({
            success: true,
            message: "Paper fetched successfully",
            data: paper
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch paper",
        });
    }
}
module.exports = { getPapers ,savedPaper, removeSavedPaper,viewPaper}; 

const axios = require("axios");
const xml2js = require("xml2js");

const paperModel = require("../models/paperModel");


const getPapers = async (req, res) => {
    const {
        searchQuery = "",
        researchField = "",
        paperType = "",
        publicationYear = "",
        sortBy = "newest",
        page = 1,
        limit = 30
    } = req.query;

    const start = (page - 1) * limit;

    try {
        // --------------------------------------------
        // BUILD SEARCH QUERY
        // --------------------------------------------

        let queryParts = [];

        // If user provided a searchQuery
        if (searchQuery.trim() !== "") {
            queryParts.push(`all:${searchQuery}`);
        }

        // If searchQuery is empty → use researchField
        if (searchQuery.trim() === "" && researchField.trim() !== "") {
            queryParts.push(`all:${researchField}`);
        }

        // If both empty → default to machine learning
        if (queryParts.length === 0) {
            queryParts.push(`all:machine learning`);
        }

        const finalQuery = queryParts.join("+AND+");

        // --------------------------------------------
        // SORTING
        // --------------------------------------------
        let sortByParam = "submittedDate";
        let sortOrderParam = "descending"; // newest → old

        if (sortBy === "oldest") {
            sortOrderParam = "ascending";
        }

        if (sortBy === "relevance") {
            sortByParam = "relevance";
        }

        // --------------------------------------------
        // ARXIV API URL
        // --------------------------------------------
        const url = `${process.env.ARXIV_API_URL}?search_query=${finalQuery}&start=${start}&max_results=${limit}&sortBy=${sortByParam}&sortOrder=${sortOrderParam}`;

        const response = await axios.get(url);

        // --------------------------------------------
        // PARSE XML
        // --------------------------------------------
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(response.data);

        const totalResults = parseInt(result.feed["opensearch:totalResults"]);
        const entries = result.feed.entry || [];

        let papers = Array.isArray(entries)
            ? entries.map((item) => ({
                id: item.id,
                title: item.title,
                abstract: item.summary,
                published: item.published,
                authors: Array.isArray(item.author)
                    ? item.author.map((a) => a.name)
                    : [item.author?.name],
                pdf_url: item.link?.find((l) => l.$.type === "application/pdf")?.$.href,
                category: Array.isArray(item.category)
                    ? item.category.map((c) => c.$.term)
                    : item.category?.$.term || [],
            }))
            : [];

        // --------------------------------------------
        // MANUAL YEAR FILTER
        // --------------------------------------------
        if (publicationYear) {
            papers = papers.filter((p) =>
                p.published.startsWith(publicationYear)
            );
        }

        // --------------------------------------------
        // MANUAL PAPER TYPE FILTER
        // --------------------------------------------
        if (paperType) {
            const type = paperType.toLowerCase();

            papers = papers.filter((paper) => {
                const title = paper.title.toLowerCase();
                const abstract = paper.abstract?.toLowerCase() || "";

                switch (type) {
                    case "research paper":
                        return true; // everything on arXiv is research

                    case "survey":
                    case "review":
                        return (
                            title.includes("survey") ||
                            title.includes("review") ||
                            abstract.includes("survey") ||
                            abstract.includes("review")
                        );

                    case "thesis":
                        return (
                            title.includes("thesis") ||
                            abstract.includes("thesis")
                        );

                    case "conference":
                        return (
                            title.includes("conference") ||
                            abstract.includes("conference")
                        );

                    default:
                        return true;
                }
            });
        }

        // --------------------------------------------
        // SEND RESPONSE
        // --------------------------------------------
        return res.status(200).json({
            success: true,
            message: "Papers fetched successfully",
            page,
            limit,
            totalResults,
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

const removeSavedPaper = async (req, res) => {
    const { paperId } = req.body;

    const userId = req.user.userId;

    try {
        const deletedPaper = await paperModel.findOneAndDelete({ _id: paperId, userId });

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

const viewPaper = async (req, res) => {

    const { paperId } = req.params;

    const userId = req.user.userId;


    try {

        const paper = await paperModel.findOne({ _id: paperId, userId });

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
module.exports = { getPapers, savedPaper, removeSavedPaper, viewPaper }; 

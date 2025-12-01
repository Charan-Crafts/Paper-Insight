const express = require('express');
const mongoose = require("mongoose")

const { getPapers,savedPaper ,removeSavedPaper ,getSavedPaperByUserId} = require('../controllers/paperController');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.userAuthentication, getPapers);

router.post("/save",authMiddleware.userAuthentication,savedPaper);

router.delete("/remove",authMiddleware.userAuthentication,removeSavedPaper);

// router.get("/:paperId",authMiddleware.userAuthentication,viewPaper);

router.get("/savedpapersByUserId/:id",authMiddleware.userAuthentication,getSavedPaperByUserId)

module.exports = router;
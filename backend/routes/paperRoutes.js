const express = require('express');

const { getPapers,savedPaper ,removeSavedPaper,viewPaper} = require('../controllers/paperController');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.userAuthentication, getPapers);

router.post("/save",authMiddleware.userAuthentication,savedPaper);

router.delete("/remove",authMiddleware.userAuthentication,removeSavedPaper);

router.get("/:paperId",authMiddleware.userAuthentication,viewPaper);

module.exports = router;
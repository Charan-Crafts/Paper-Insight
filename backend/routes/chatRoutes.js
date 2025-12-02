const express = require('express');

const router = express.Router();

const chatController = require("../controllers/chatControllers");

router.post("/fetch-pdf-text",chatController.fetchTextFromPdf);


module.exports = router;
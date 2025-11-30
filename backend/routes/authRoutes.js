const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const userController = require('../controllers/userController');

router.post("/register",userController.userRegistration);

router.post("/login",userController.userLogin);

router.post("/logout",authMiddleware.userAuthentication,userController.userLogout);

router.post("/update-password",authMiddleware.userAuthentication,userController.updatePassword);

router.get("/profile",authMiddleware.userAuthentication,userController.userDetails);

module.exports = router;
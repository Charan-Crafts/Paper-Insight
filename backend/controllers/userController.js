const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const hashedPassword = async (password) => {

    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
}

const generateToken = (user) => {

    const accessToken = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )

    const refreshToken = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )

    return { accessToken, refreshToken };

}

const userRegistration = async (req, res) => {

    const { userName, email, password, role, country } = req.body;

    try {

        const checkUser = await userModel.findOne({ email: email });

        if (checkUser) {
            return res.status(422).json({
                success: false,
                message: "User already exists"
            })
        }

        //Hash the password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user

        const newUser = userModel({
            userName,
            email,
            password: hashedPassword,
            role,
            country
        })

        const { accessToken, refreshToken } = generateToken(newUser);

        // Store the refresh Token in DB

        newUser.refreshToken = refreshToken;

        await newUser.save();

        // Set the refresh token in httpOnly cookie

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 // 15 minutes
        })

        const response = await userModel.findById(newUser._id).select("-password -refreshToken -__v -createdAt -updatedAt");

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: response,
                accessToken
            }
        })
    } catch (error) {
        console.log("Error in user registration", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        // check if user exists

        const checkUser = await userModel.findOne({
            email: email
        })

        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User not found, please register"
            })
        }

        // Compare passwords 

        const isPasswordMatch = await bcrypt.compare(password, checkUser.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // Generate tokens

        const { accessToken, refreshToken } = generateToken(checkUser);

        // Store the refresh Token in DB

        checkUser.refreshToken = refreshToken;

        await checkUser.save();
        // Set the refresh token in httpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 // 15 minutes
        })

        const response = await userModel.findById(checkUser._id).select("-password -refreshToken -__v -createdAt -updatedAt");

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data:{
                user:response,
                accessToken
            }
        })

    } catch (error) {
        console.log("Error in user login", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


const userLogout = async (req, res) => {
    try {

        console.log(req.user)

        const userId = req.user.userId;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            })
        }

        // remove refresh token from db

        const user = await userModel.findById(userId);

        user.refreshToken = "";

        await user.save();

        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })


        
    } catch (error) {
        console.log("Error in user logout", error);

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}



const updatePassword = async(req,res)=>{

    const {password}= req.body;

    const userId = req.user.userId;

    try {

        const user = await userModel.findById(userId);

        const hashedNewPassword = await bcrypt.hash(password, 10);

        user.password = hashedNewPassword;

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
        
    } catch (error) {

        console.error("Error updating password:", error.message);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
    }
}


const userDetails = async(req,res)=>{
    const userId = req.user.userId;

    try {

        const response = await userModel.findById(userId).select("-password -refreshToken -__v -createdAt -updatedAt");

        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            data:response
        })
        
    } catch (error) {
        console.log("Error in fetching user details", error);

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
module.exports = { userRegistration ,userLogin ,userLogout ,updatePassword ,userDetails};
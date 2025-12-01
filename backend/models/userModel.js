const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["researcher","admin","student","instructor","other"],
        default:"student"
    },
    country:{
        type:String,
        default:"INDIA"
    },
    refreshToken:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema);

module.exports = User;
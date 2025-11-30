const mongoose = require('mongoose');



// const { id, title, authors, abstract, pdf_url, category, published } = req.body;

const paperSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    paperId:{
        type:String
    },
    title:{
        type:String
    },
    authors:[
        {
            type:String,
            trim:true
        }
    ],
    abstract:{
        type:String
    },
    year:{
        type:String
    },field:{
        type:String
    },category:[{
        type:String
    }],pdf_url:{
        type:String
    },
    published:{
        type:String
    }
},{timestamps:true})

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;
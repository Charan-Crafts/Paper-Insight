const mongoose = require('mongoose');

const connection = async () => {

    try {

        const response = await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");

    } catch (error) {

        console.log("Error while connecting to DB", error);
        

    }
}

module.exports = connection;
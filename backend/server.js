require("dotenv").config();

const express = require("express")

const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const DB_Connection = require("./config/MongoDB")

DB_Connection();


const port =5000


// Routes Import

const authRoutes = require("./routes/authRoutes");
const paperRoutes = require("./routes/paperRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/v1/chat",chatRoutes);

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/papers",paperRoutes);


app.listen(port,()=>{
    console.log("Server is running at port ",port);
    
})
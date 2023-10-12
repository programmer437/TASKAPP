const connectDB=require("./db/connect");
const express= require("express");
const user=require("./routes/users")
const path = require('path');
const cookieParser = require('cookie-parser');
const authenticateUser=require("./middlewares/authMiddleware");
const tasks=require("./routes/tasks")
const cors = require('cors');





require('dotenv').config();
const app=express();
app.use(express.static('public/build'));
const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend's URL
    credentials: true,
     // This allows cookies to be sent in cross-origin requests
  };
app.use(express.json());
app.use(cookieParser()); 
app.use(cors(corsOptions));

app.use('/api/v1/users',user);
app.use('/api/v1/tasks',authenticateUser,tasks);


const port=3000;

const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening at port ${port}`))
        
    } catch (error) {
        console.log(error);
        
    }
}
start();


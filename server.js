const express = require('express');
const connectDB = require('./src/config/db');
const app=express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

//API routes
const bikeRoutes = require("./src/routes/bikeRoutes");
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.get('/',(req,res)=>{
    res.send('Hello from backend');
})
connectDB();    
app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

import express from "express";
const app = express();

app.use("/api/",(req,res) =>{res.send("hola mundo")})

export default app;
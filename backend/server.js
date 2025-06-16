const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDb")
const cors=require("cors")

const PORT=process.env.PORT || 5000

connectDb()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))
app.use("/gemini",require("./routes/gemini"))

// Debug route to test server
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
    console.log('Available routes:');
    console.log('- GET /test');
    console.log('- POST /gemini/generate-recipe');
})
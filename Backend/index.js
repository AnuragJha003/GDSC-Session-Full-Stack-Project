import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 4000;
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(prompt) {
    prompt=prompt+' and give response in markdown only if possible';
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}


app.post("/", async (req, res) => {
    const Inputprompt = req.body.prompt;
    try 
    {
       const response = await run(Inputprompt);
        console.log(response);
        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
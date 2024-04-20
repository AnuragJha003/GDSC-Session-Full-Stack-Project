import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 3000;

app.use(cors());
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:5173");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

async function run(prompty, imagePart) 
{
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    console.log(prompty);
    var prompt;
    if(prompty.length=='')
    {
        prompt="What is the picture?";
    }
    else
    {
        prompt=prompty;
    }

  
    const imageParts = [
      fileToGenerativePart(imagePart, "image/png")
    ];
  
    const result = await model.generateContentStream([prompt, ...imageParts]);

    let text = '';
    for await (const chunk of result.stream) 
    {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
    }

    return text;
  }
  


app.post('/upload', upload.single('image'), async (req, res) => {
  try 
  {
    console.log("Request received");
    const question = req.body.question;
    const image = req.file.buffer;
    const result = await run(question, image);
    res.send(result);
  } 
  catch (error) 
  {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
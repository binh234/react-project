import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hellp from DALL-E");
});

// Image generation
router.route("/").get(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiReponse = await openai.Image.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiReponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(500).send(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

//   Image variations
router.route("/variant").get(async (req, res) => {
  try {
    const { buffer } = req.body;
    buffer.name = "image.png";
    const aiReponse = await openai.Image.createImageVariation(
      buffer,
      1,
      "1024x1024",
      "b64_json"
    );
    const image = aiReponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(500).send(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

export default router;

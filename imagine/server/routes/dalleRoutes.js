import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { IMAGE_SIZE } from "../config.js";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.json({ message: "Hello from DALL-E" });
});

// Image generation
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiReponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: `${IMAGE_SIZE}x${IMAGE_SIZE}`,
      response_format: "b64_json",
    });
    const image = aiReponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(500).json(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

// Image variations
router.route("/variant").post(async (req, res) => {
  try {
    const { photo } = req.body;
    const buffer = Buffer.from(photo, "base64");
    buffer.name = "image.png";
    const aiReponse = await openai.createImageVariation(
      buffer,
      1,
      `${IMAGE_SIZE}x${IMAGE_SIZE}`,
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

import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { IMAGE_SIZE } from '../config/index.js';

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'DALL-E routes' });
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: IMAGE_SIZE,
      response_format: 'b64_json',
    });
    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong! Please try again later' });
  }
});

export default router;

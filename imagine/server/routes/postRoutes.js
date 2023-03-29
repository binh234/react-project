import express, { response } from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import ImageKit from "imagekit";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import Post from "../models/post.js";
import { PAGE_LIMIT } from "../config.js";
import { validateNumber } from "../utils/helpers.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_API_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_END_POINT,
});

// Get all post
router.route("/").get(async (req, res) => {
  try {
    let { prompt, name, tags, cursor, limit } = req.query;
    // const page = parseInt(req.query.page) || 1;
    cursor = cursor || new Date().toISOString();
    limit = validateNumber(parseInt(limit) || PAGE_LIMIT);
    if (tags && typeof tags === "string") {
      tags = [tags];
    }
    const search = [];
    if (name) {
      search.push({ name: { $regex: name, $options: "i" } }); // Search in name
    }
    if (prompt) {
      search.push({ prompt: { $regex: prompt, $options: "i" } }); // Search in prompt
    }
    if (tags) {
      search.push({ tags: { $in: tags } }); // Search in tags
    }

    let query = {date: { $lt: cursor }};
    if (search.length > 0) {
      query["$and"] = search
    }
    const posts = await Post.find(query).sort({ date: "desc" }).limit(limit);

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error });
  }
});

// Create post
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo, tags } = req.body;
    if (typeof tags === "string") {
      tags = [tags];
    } else if (!Array.isArray(tags)) {
      tags = [];
    }
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    }); // big_red_donkey
    const response = await imagekit.upload({
      file: photo, //required
      fileName: `${randomName}.png`, //required
      useUniqueFileName: true,
      tags: tags
    });

    // const photoUrl = await cloudinary.uploader.upload(
    //   "data:image/jpeg;base64," + photo
    // );

    const newPost = await Post.create({
      name,
      prompt,
      photo: response.filePath,
      tags: tags,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

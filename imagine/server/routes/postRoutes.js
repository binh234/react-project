import express from "express";
import * as dotenv from "dotenv";
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
    limit = validateNumber(parseInt(limit) || PAGE_LIMIT, 1, 50);
    if (tags && typeof tags === "string") {
      tags = [tags];
    }


    let query = { date: { $lt: cursor } };
    if (prompt) {
      query["$text"] = { $search: `"${prompt}"` }; // Search in prompt
    }
    if (name) {
      query["name"] = { $regex: name, $options: "i" }; // Search in name
    }
    if (tags) {
      query["tags"] = { $in: tags }; // Search in tags
    }

    // 1 for ascending, -1 for descending
    let sortOptions = { date: -1 };
    // if (prompt) {
    //   sortOptions = {
    //     // ToDo: Optimize text search, steps to cover
    //     // Step 1: Split data to chunks based on date
    //     // Step 2: Perform text search on each chunk
    //     // Step 3 (optional): Estimated count results with full text search on first query
    //     // Step 4: Return search results with cursor point to last chunk (maybe on last date proccessed)
    //     score: { $meta: "textScore" },
    //   };
    // }
    const posts = await Post.find(query).sort(sortOptions).limit(limit);

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
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
      tags: tags,
    });

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

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import ImageKit from "imagekit";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import Property from "../models/property.js";
import User from "../models/user.js";

dotenv.config();

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_API_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_END_POINT,
});

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query = {};
  if (propertyType) {
    query.propertyType = propertyType;
  }
  if (title_like) {
    query.title = { $regex: title_like, $option: "i" };
  }

  try {
    const count = await Property.countDocuments({query});
    const properties = await Property.find(query).limit(_end).skip(_start).sort({ [_sort]: _order});

    res.header('x-total-count', count)
    res.header('Access-Control-Expose-Headers', 'x-total-count')
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    // Start a new session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    }); // big_red_donkey
    const response = await imagekit.upload({
      file: photo, //required
      fileName: `${randomName}.png`, //required
      useUniqueFileName: true,
    });

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: response.filePath,
      creator: user._id,
    });
    user.allProperties.push(newProperty);

    await user.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {};

const deleteProperty = async (req, res) => {};

const getPropertyDetail = async (req, res) => {};

export {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyDetail,
};

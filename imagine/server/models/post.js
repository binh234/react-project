import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  date: { type: Date, default: Date.now, index: true },
  tags: {
    type: [
      {
        type: String,
      },
    ],
  },
});

PostSchema.index({prompt: "text"})

const Post = mongoose.model("Post", PostSchema);

export default Post;

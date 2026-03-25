import mongoose, { Schema } from "mongoose";

const postschema = mongoose.Schema({
  title: String,
  desc: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Post = mongoose.model("Post", postschema);
export default Post;

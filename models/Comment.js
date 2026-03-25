import mongoose, { Schema } from "mongoose";
import { nullable } from "zod";

const commentSchema = mongoose.Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  Parent: { type: Schema.ObjectId, ref: "Comment", default: null },
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

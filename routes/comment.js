import { Router } from "express";
import Comment from "../models/Comment.js";
import { authMiddleware } from "../middleware/auth.js";
import { buildCommentTree } from "../utils/helper.js";

const commentRouter = Router();

commentRouter.get("/", async (req, res) => {
  const comments = await Comment.find().populate("user").populate("post");
  res.json(comments);
});

commentRouter.post("/", authMiddleware, async (req, res) => {
  const comment = await Comment.create({
    ...req.body,
    user: req.user.id,
  });

  res.json(comment);
});

commentRouter.delete("/:id", authMiddleware, async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Comment deleted" });
});
commentRouter.get("/post/:postId", async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "email")
    .sort({ createdAt: 1 });

  const nested = buildCommentTree(comments);

  res.json(nested);
});

export default commentRouter;

import { Router } from "express";
import Post from "../models/Post.js";
import { authMiddleware } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.json(posts);
});

postRouter.post(
  "/",
  authMiddleware,
  body("desc").notEmpty().escape(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send(`Hello, ${req.user.email}!`);
    }
    try {
      const post = await Post.create({
        ...req.body,
        author: req.user.id,
      });

      res.json(post);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

postRouter.post("/:id/like", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
  }

  await post.save();
  res.json(post);
});

export default postRouter;

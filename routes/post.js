import { Router } from "express";
import Post from "../models/Post.js";
import { authMiddleware, authorizeRoles } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const { author, keyword } = req.query;

  let filter = {};

  if (author) filter.author = author;
  if (keyword) filter.title = { $regex: keyword, $options: "i" };

  const posts = await Post.find(filter).populate("author");

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

postRouter.put("/:id", authMiddleware, async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(post);
});

postRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  },
);
postRouter.post("/:id/like", authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);

  const index = post.likes.indexOf(req.user.id);

  if (index === -1) {
    post.likes.push(req.user.id);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();
  res.json(post);
});

export default postRouter;

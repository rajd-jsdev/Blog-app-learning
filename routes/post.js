import { Router } from "express";
import Post from "../models/Post.js";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
});

postRouter.post("/", async (req, res) => {
  const body = req.body;

  const post = await Post.create(body);

  return res.json(post);
});

postRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    res.status(403).send("No post found with this mail");
  }
  if (post) {
    res.send(post);
  } else {
    res.status(400).send("Invalid cred");
  }
});
export default postRouter;

import { Router } from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
const commentRouter = Router();

commentRouter.get("/", async (req, res) => {
  const comment = await Comment.find();
  return res.json(comment);
});

commentRouter.post("/", async (req, res) => {
  const body = req.body;

  const comment = await Comment.create(body);

  return res.json(comment);
});

commentRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    res.status(403).send("No post found with this mail");
  }
  if (comment) {
    res.send(comment);
  } else {
    res.status(400).send("Invalid cred");
  }
});
export default commentRouter;

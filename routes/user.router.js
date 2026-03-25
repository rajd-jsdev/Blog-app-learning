import { Router } from "express";
import User from "../models/User.js";

import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

userRouter.post("/", async (req, res) => {
  const body = req.body;

  const hashed = await bcrypt.hash(body.password, 10);

  const user = await User.create({ ...body, password: hashed });

  return res.json(user);
});

userRouter.post("/login", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ email: body.email });
  if (!user) {
    res.status(403).send("No user found with this mail");
  }
  if (await bcrypt.compare(body.password, user.password)) {
    res.send(user);
  } else {
    res.status(400).send("Invalid cred");
  }
});
export default userRouter;

import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { authMiddleware } from "../middleware/auth.js";
import { body, query, validationResult } from "express-validator";
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

userRouter.post(
  "/register",
  body("age").notEmpty().escape(),
  async (req, res) => {
    const body = req.body;
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {
      return res.send(`enter Age bhai !!!`);
    }
    const hashed = await bcrypt.hash(body.password, 10);

    const user = await User.create({ ...body, password: hashed });

    res.json(user);
  },
);

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Login successful" });
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

userRouter.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default userRouter;

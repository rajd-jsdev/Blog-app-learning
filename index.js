import "dotenv/config";
import express from "express";
import { connectDB } from "./db.js";
import userRouter from "./routes/user.router.js";
import pino, { levels } from "pino";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import cookieParser from "cookie-parser";
const app = express();
const logger = pino({ level: "debug" });
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  logger.debug({
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
  });
  next();
});

connectDB();

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.listen(3000, () => {
  console.log("started on http://localhost:3000");
});

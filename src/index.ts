import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://example.com"],
};

const corsMiddleware = cors(corsOptions);

app.use(corsMiddleware);

dotenv.config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: any) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.post("/users", async (_req: Request, res: Response) => {
  const users = await User.create(_req.body);

  res.status(201).json({
    status: "success",
    users,
  });
});

app.get("/users", async (_req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

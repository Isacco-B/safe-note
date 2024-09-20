import express from "express";
import crypto from "crypto";
import cors from "cors";
import Note from "./models/notes.model.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import {
  errorHandler,
  loginLimiter,
  formValidator,
} from "./middleware/index.js";
import { validationResult } from "express-validator";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function createNote(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      errorHandler(400, "Invalid fields, please check your form and try again!")
    );
  }

  const { content, expiresIn } = req.body;

  try {
    const algorithm = "aes-256-ctr";
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(content, "utf8", "hex");
    encrypted += cipher.final("hex");

    const note = await Note.create({
      content: `${encrypted}:${iv.toString("hex")}:${key.toString("hex")}`,
      encrypted: true,
      expiresAt: new Date(Date.now() + expiresIn * 60 * 1000),
      link: uuidv4(),
    });

    res.json({ link: `http://localhost:${PORT}/note/${note.link}` });
  } catch (error) {
    next(error);
  }
}

async function getNote(req, res, next) {
  const { link } = req.params;

  if (!link) {
    return errorHandler(400, "Invalid link");
  }
  try {
    const note = await Note.findOne({ where: { link } });

    if (!note) return errorHandler(404, "Link not found");

    if (note.viewed || note.expiresAt < Date.now()) {
      return errorHandler(404, "Link already expired");
    }

    const [encryptedData, iv, key] = note.content.split(":");
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      Buffer.from(key, "hex"),
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    note.viewed = true;
    await note.save();

    res.json({ content: decrypted });
  } catch (error) {
    next(error);
  }
}

app.post("/create-note", loginLimiter, formValidator, createNote);
app.get("/note/:link", loginLimiter, getNote);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res
    .status(statusCode)
    .json({ success: false, statusCode, message, isError: true });
});

app.listen(PORT, () => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? `${process.env.HOST}`
      : `http://localhost:${PORT}`;

  console.log(`Listening on ${baseURL}`);
});

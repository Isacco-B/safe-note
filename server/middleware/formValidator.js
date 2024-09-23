import { check } from "express-validator";

const formValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .escape()
    .trim(),
  check("content")
    .notEmpty()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be a string")
    .trim(),
  check("expiresIn")
    .notEmpty()
    .withMessage("Expires is required")
    .isNumeric()
    .withMessage("Expires must be a number")
    .escape()
    .trim(),
];

export default formValidator;

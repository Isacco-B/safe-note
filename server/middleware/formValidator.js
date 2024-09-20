import { check } from "express-validator";

const formValidator = [
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

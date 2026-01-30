import { body } from "express-validator";

export const postValidator = [
  body("title").notEmpty(),
  body("content").notEmpty()
];

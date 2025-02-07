import { body } from "express-validator";

export const addTodoValidator = () => {
  return [
    body("title")
      .exists()
      .withMessage("Title is required.")
      .isString()
      .withMessage("Title must be a string."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    body("dueDate")
      .exists()
      .withMessage("Due date is required.")
      .isISO8601()
      .withMessage("Due date must be a valid date."),
    body("status")
      .optional()
      .isBoolean()
      .withMessage("Status must be a boolean."),
  ];
};

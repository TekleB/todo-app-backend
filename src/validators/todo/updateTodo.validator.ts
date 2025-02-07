import { body, param } from "express-validator";

export const updateTodoValidator = () => {
  return [
    param("id")
      .exists()
      .withMessage("Todo ID is required.")
      .isString()
      .withMessage("Todo ID must be a string."),
    body("title").optional().isString().withMessage("Title must be a string."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("Due date must be a valid date."),
    body("status")
      .optional()
      .isBoolean()
      .withMessage("Status must be a boolean."),
  ];
};

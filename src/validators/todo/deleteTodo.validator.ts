import { param } from "express-validator";

export const deleteTodoValidator = () => {
  return [
    param("id")
      .exists()
      .withMessage("Todo ID is required.")
      .isString()
      .withMessage("Todo ID must be a string."),
  ];
};

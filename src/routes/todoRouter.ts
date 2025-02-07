import { Router } from "express";
import { TodoController } from "../controllers";
import { TodoValidator } from "../validators";
import { checkAuth } from "../utils/checkAuth";

export const todoRouter = Router();

todoRouter.post(
  "/",
  checkAuth,
  TodoValidator.addTodoValidator(),
  TodoController.addTodoController
);

todoRouter.put(
  "/:id",
  checkAuth,
  TodoValidator.updateTodoValidator(),
  TodoController.updateTodoController
);

todoRouter.delete(
  "/:id",
  checkAuth,
  TodoValidator.deleteTodoValidator(),
  TodoController.deleteTodoController
);

todoRouter.get(
  "/:id",
  checkAuth,
  TodoValidator.getUserTodoValidator(),
  TodoController.getUserOneTodoController
);

todoRouter.get("/", checkAuth, TodoController.getUserTodosController);

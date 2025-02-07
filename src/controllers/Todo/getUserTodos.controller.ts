import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

// Handler to get all todos for a user
const getUserTodosHandler = async (req, res) => {
  const { uuid } = req.user;

  const todos = await todoService.getUserTodos(uuid);

  res.status(httpStatus.OK).json(todos);
};

export const getUserTodosController = errorHandlerWrapper(getUserTodosHandler);

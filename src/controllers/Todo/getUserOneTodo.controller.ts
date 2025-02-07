import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

// Handler to get a specific todo for a user
const getUserOneTodoHandler = async (req, res) => {
  const { id } = req.params;
  const { uuid } = req.user;

  const todo = await todoService.getUserTodo(id, uuid);

  if (!todo) return res.status(httpStatus.NOT_FOUND).json("Todo not found");

  res.status(httpStatus.OK).json(todo);
};

export const getUserOneTodoController = errorHandlerWrapper(
  getUserOneTodoHandler
);

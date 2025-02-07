import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

// Handler to get all todos for a user
const getUserTodosHandler = async (req, res) => {
  const { uuid } = req.user;

  const todos = await todoService.getUserTodos(uuid);

  const filteredTodos = todos.map(todo => ({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
    id: todo.id,
    updatedAt: todo.updatedAt,
    status: todo.status,
    createdAt: todo.createdAt,
    userId: todo.user.uuid,
  }));

  res.status(httpStatus.OK).json(filteredTodos);
};

export const getUserTodosController = errorHandlerWrapper(getUserTodosHandler);

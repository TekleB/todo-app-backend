import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const addTodoHandler = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const user = req.user;

  const newTodo = await todoService.createTodo({
    title,
    description,
    dueDate,
    user,
  });

  if (!newTodo) {
    return res
      .status(httpStatus.CONFLICT)
      .json({ message: "Todo with this title already exists" });
  }

  res.status(httpStatus.CREATED).json(newTodo.id);
};

export const addTodoController = errorHandlerWrapper(addTodoHandler);

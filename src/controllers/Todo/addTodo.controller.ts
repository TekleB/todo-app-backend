import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const addTodoHandler = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const user = req.user;
  try {
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

    res.status(httpStatus.CREATED).json(newTodo);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating todo", error });
  }
};

export const addTodoController = errorHandlerWrapper(addTodoHandler);

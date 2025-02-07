import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

// Handler to update a specific todo
const updateTodoHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  const { uuid } = req.user;

  try {
    const updatedTodo = await todoService.updateTodo(id, uuid, {
      title,
      description,
      dueDate,
      status,
    });

    if (!updatedTodo) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Todo not found or not authorized" });
    }

    res.status(httpStatus.OK).json(updatedTodo);
  } catch (error) {
    if ((error as Error).message === "Todo with this title already exists") {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: (error as Error).message });
    }
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while updating the todo" });
  }
};

export const updateTodoController = errorHandlerWrapper(updateTodoHandler);

import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

// Handler to delete a specific todo
const deleteTodoHandler = async (req, res) => {
  const { id } = req.params;
  const { uuid } = req.user;

  const deletedTodo = await todoService.deleteTodo(id, uuid);

  if (!deletedTodo)
    return res
      .status(httpStatus.NOT_FOUND)
      .json("Todo not found or not authorized");

  res.status(httpStatus.OK).json(deletedTodo);
};

export const deleteTodoController = errorHandlerWrapper(deleteTodoHandler);

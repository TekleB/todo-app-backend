import { TodoEntity } from "../entities";
import { AppDataSouce } from "../db";
import { TodoData } from "../types";

export const createTodo = async (data: TodoData): Promise<TodoEntity> => {
  const { title, dueDate, description, user } = data;
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  const existingTodo = await todoRepository.findOne({
    where: { title },
  });

  if (existingTodo) return null;

  const todo = todoRepository.create({
    title,
    dueDate,
    description,
    userId: user.uuid,
  });

  await todoRepository.save(todo);
  return todo;
};

// Service to get a specific todo for a user
export const getUserTodo = async (
  id: string,
  userId: string
): Promise<TodoEntity> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  const findTodo = await todoRepository.findOne({
    where: { id, user: { uuid: userId } },
    relations: ["user"],
  });

  return findTodo || null;
};

// Service to get all todos for a user
export const getUserTodos = async (userId: string): Promise<TodoEntity[]> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  const findTodos = await todoRepository.find({
    where: { user: { uuid: userId } },
    relations: ["user"],
  });

  return findTodos;
};

// Service to update a specific todo of a user
export const updateTodo = async (
  id: string,
  userId: string,
  data
): Promise<TodoEntity> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  const todo = await todoRepository.findOne({
    where: { id, user: { uuid: userId } },
  });

  if (!todo) return null;

  const existingTodo = await todoRepository.findOne({
    where: { title: data.title },
  });

  if (existingTodo) {
    throw new Error("Todo with this title already exists");
  }

  Object.assign(todo, data);
  await todoRepository.save(todo);
  return todo;
};

// Service to delete a specific todo of a user
export const deleteTodo = async (
  id: string,
  userId: string
): Promise<string> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  const todo = await todoRepository.findOne({
    where: { id, user: { uuid: userId } },
  });

  if (!todo) return null;

  await todoRepository.remove(todo);
  return todo.id;
};

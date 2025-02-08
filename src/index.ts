import express from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { authRouter } from "./routes/authRouter";
import { todoRouter } from "./routes/todoRouter";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";

const setupServer = async () => {
  await dbCreate();

  await AppDataSouce.initialize();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routeMiddleware);
  app.use("/health", (_req, res) => {
    res.json({ msg: "Hello Get Zell" });
  });

  app.use("/api/v1/auth", authRouter);
  app.use('/api/v1/todos', todoRouter);
  app.use(errorHandlerMiddleware);

  const { port } = Env;

  app.listen(port, () => {
    console.log(`Server is listening on ${port}.`);
  });
};

setupServer();

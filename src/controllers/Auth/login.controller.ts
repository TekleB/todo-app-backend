import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userService.getOneUser({ email });
  if (!findUser) return res.status(httpStatus.NOT_FOUND).json("User not found");
  if (findUser.deletedAt)
    return res.status(httpStatus.NOT_FOUND).json("User not found");
  const compare = await comparePassword(password, findUser.password);
  if (!compare)
    return res
      .status(httpStatus.FORBIDDEN)
      .json("Username or Password is not correct");
  const token = generateToken(findUser.uuid);
  res.json({ token, username: findUser.username, uuid: findUser.uuid, email: findUser.email }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);

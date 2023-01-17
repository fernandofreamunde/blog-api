import { Router } from "express";
import { AuthenticationController } from "../useCases/authentication/AuthenticationController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticationController = new AuthenticationController();

userRouter.post('/users', createUserController.handle);
userRouter.post('/login', authenticationController.handle);

export { userRouter };

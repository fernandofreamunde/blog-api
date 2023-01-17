import { Router } from "express";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { AuthenticationController } from "../useCases/authentication/AuthenticationController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ProfileController } from "../useCases/profile/ProfileController";

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticationController = new AuthenticationController();
const profileController = new ProfileController();

userRouter.post('/users', createUserController.handle);
userRouter.post('/login', authenticationController.handle);
userRouter.get('/profile', Auth, profileController.handle);

export { userRouter };

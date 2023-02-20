import { Router } from "express";
import { CreateCardController } from "../useCases/createCard/CreateCardController";
import { Auth } from "../../../core/middleware/AuthMiddleware";

const cardRouter = Router();

const createCardController = new CreateCardController();
cardRouter.post('/cards', Auth, createCardController.handle);

export { cardRouter };

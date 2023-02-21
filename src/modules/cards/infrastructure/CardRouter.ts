import { Router } from "express";
import { CreateCardController } from "../useCases/createCard/CreateCardController";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { UpdateCardController } from "../useCases/updateCard/UpdateCardController";

const cardRouter = Router();

const createCardController = new CreateCardController();
const updateCardController = new UpdateCardController();

cardRouter.post('/cards', Auth, createCardController.handle);
cardRouter.patch('/cards/:id', Auth, updateCardController.handle);

export { cardRouter };

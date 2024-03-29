import { Router } from "express";
import { CreateCardController } from "../useCases/createCard/CreateCardController";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { UpdateCardController } from "../useCases/updateCard/UpdateCardController";
import { DeleteCardContrroller } from "../useCases/deleteCard/DeleteCardController";
import { ListAllCardsController } from "../useCases/listAllCards/ListAllCardsController";
import { ListPublicCardsController } from "../useCases/listPublicCards/ListPublicCardsController";

const cardRouter = Router();

const createCardController = new CreateCardController();
const updateCardController = new UpdateCardController();
const deleteCardController = new DeleteCardContrroller();
const listCardsController = new ListAllCardsController();
const listPublicCardsController = new ListPublicCardsController();

cardRouter.get('/admin/cards', Auth, listCardsController.handle);
cardRouter.get('/cards', listPublicCardsController.handle);
cardRouter.post('/cards', Auth, createCardController.handle);
cardRouter.patch('/cards/:id', Auth, updateCardController.handle);
cardRouter.delete('/cards/:id', Auth, deleteCardController.handle);

export { cardRouter };

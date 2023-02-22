import { Request, Response } from "express";
import { UpdateCardUseCase } from "./UpdateCardUseCase";
import { CardRepository } from "../../../../modules/cards/infrastructure/CardRepository";

class UpdateCardController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { name, description, type, published_at, data } = request.body;
    const { id } = request.params;

    // replace this with tsrynge container to get UseCase instance
    const repo = new CardRepository();
    const usecase = new UpdateCardUseCase(repo);
    const result = await usecase.execute({ id, name, description, type, published_at, data });


    return response.status(200).json(result);
  }
}

export { UpdateCardController };

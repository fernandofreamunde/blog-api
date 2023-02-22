import { Request, Response } from "express";
import { ListAllCardsUseCase } from "./ListAllCardsUseCase";
import { CardRepository } from "../../../../modules/cards/infrastructure/CardRepository";

class ListAllCardsController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    // replace this with tsrynge container to get UseCase instance
    const repo = new CardRepository();
    const usecase = new ListAllCardsUseCase(repo);
    const result = await usecase.execute();


    return response.status(200).json(result);
  }
}


export { ListAllCardsController };

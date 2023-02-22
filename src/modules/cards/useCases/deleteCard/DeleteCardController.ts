import { Request, Response } from "express";
import { DeleteCardUseCase } from "./DeleteCardUseCase";
import { CardRepository } from "../../../../modules/cards/infrastructure/CardRepository";

class DeleteCardContrroller {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const id = request.params.id;

    // replace this with tsrynge container to get UseCase instance
    const repo = new CardRepository();
    const usecase = new DeleteCardUseCase(repo);
    const result = await usecase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteCardContrroller };

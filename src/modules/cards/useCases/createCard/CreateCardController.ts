import { Request, Response } from "express";
import { CreateCardUseCase } from "./CreateCardUseCase";
import { CardRepository } from "../../../../modules/cards/infrastructure/CardRepository";

class CreateCardController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const {
      name,
      description,
      type,
      blog,
      published_at,
      data,
    } = request.body;

    // replace this with tsrynge container to get UseCase instance
    const repo = new CardRepository();
    const usecase = new CreateCardUseCase(repo);
    const card = await usecase.execute({ name, description, type, blog, published_at, data });

    return response.status(200).json(card);
  }
}

export { CreateCardController };

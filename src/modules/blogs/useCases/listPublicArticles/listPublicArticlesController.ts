import { Request, Response } from "express";
import { ListPublicArticlesUseCase } from "./ListPublicArticlesUseCase";
import { ArticleRepository } from "../../infrastructure/ArticleRepository";

class ListPublicArticlesController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {

    // replace this with tsrynge container to get UseCase instance
    const repo = new ArticleRepository();
    const usecase = new ListPublicArticlesUseCase(repo);
    const result = await usecase.execute();

    return response.status(200).json(result);
  }
}

export { ListPublicArticlesController };

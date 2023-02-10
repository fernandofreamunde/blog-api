import { Request, Response } from "express";
import { ListPublicArticlesUseCase } from "./listPublicArticlesUseCase";
import { ArticleRepository } from "../../../../modules/blogs/infrastructure/ArticleRepository";

class listPublicArticlesController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {

    // replace this with tsrynge container to get UseCase instance
    const repo = new ArticleRepository();
    const usecase = new ListPublicArticlesUseCase(repo);
    const result = await usecase.execute();

    return response.status(200).json(result);
  }
}

export { listPublicArticlesController };

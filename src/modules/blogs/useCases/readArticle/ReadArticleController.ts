import { Request, Response } from "express";
import { ReadArticleUseCase } from "./ReadArticleUseCase";
import { ArticleRepository } from "../../../../modules/blogs/infrastructure/ArticleRepository";

class ReadArticleController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {

    const { id } = request.params;
    // replace this with tsrynge container to get UseCase instance
    const repo = new ArticleRepository();
    const usecase = new ReadArticleUseCase(repo);
    const result = await usecase.execute(id);


    return response.status(200).json(result);
  }
}

export { ReadArticleController };

import { Request, Response } from "express";
import { DeleteArticleUseCase } from "./DeleteArticleUseCase";
import { ArticleRepository } from "../../../../modules/blogs/infrastructure/ArticleRepository";

class DeleteArticleController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = request.params;
    const user_id = request.session_user_id;
    // replace this with tsrynge container to get UseCase instance
    const repo = new ArticleRepository();
    const usecase = new DeleteArticleUseCase(repo);
    await usecase.execute({ id, user_id });

    return response.status(204).send();
  }
}

export { DeleteArticleController };

import { Request, Response } from "express";
import { ArticleRepository } from "modules/blogs/infrastructure/ArticleRepository";
import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

class UpdateArticleController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { title, body, published_at } = request.body;
    const { id } = request.params;
    const user_id = request.session_user_id;

    // replace this with tsrynge container to get UseCase instance
    const repo = new ArticleRepository();
    const usecase = new UpdateArticleUseCase(repo);
    const blog = await usecase.execute({ id, title, body, published_at, user_id });

    return response.status(200).json(blog);
  }
}

export { UpdateArticleController };

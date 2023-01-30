import { Request, Response } from "express";
import { ArticleRepository } from "../../../../modules/blogs/infrastructure/ArticleRepository";
import { BlogRepository } from "../../../../modules/blogs/infrastructure/BlogRepository";
import { CreateArticleUseCase } from "./CreateArticleUseCase";

class CreateArticleController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { title, body, published_at, blog } = request.body;
    const author = request.session_user_id;
    
    // replace this with tsrynge container to get UseCase instance
    const repo = new ArticleRepository();
    const blogRepo = new BlogRepository();
    const usecase = new CreateArticleUseCase(repo, blogRepo);
    const article = await usecase.execute({ title, body, published_at, author, blog });

    return response.status(201).json(article);
  }
}

export { CreateArticleController };

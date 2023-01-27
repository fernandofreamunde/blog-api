import { Request, Response } from "express";
import { BlogRepository } from "../../../../modules/blogs/infrastructure/BlogRepository";
import { CreateBlogUseCase } from "./CreateBlogUseCase";

class CreateBlogController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { name, description } = request.body;

    // replace this with tsrynge container to get UseCase instance
    const repo = new BlogRepository();
    const user_id = request.session_user_id;
    const usecase = new CreateBlogUseCase(repo);
    const blog = await usecase.execute({ name, description, owner: user_id });

    return response.status(201).json(blog);
  }
}

export { CreateBlogController };

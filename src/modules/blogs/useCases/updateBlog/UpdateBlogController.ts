import { Request, Response } from "express";
import { BlogRepository } from "../../infrastructure/BlogRepository";
import { UpdateBlogUseCase } from "./UpdateBlogUseCase";

class UpdateBlogController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { name, description } = request.body;
    const { id } = request.params;

    // replace this with tsrynge container to get UseCase instance
    const repo = new BlogRepository();
    const user_id = request.session_user_id;
    const usecase = new UpdateBlogUseCase(repo);
    const blog = await usecase.execute({ id, name, description, owner: user_id });

    return response.status(201).json(blog);
  }
}

export { UpdateBlogController };

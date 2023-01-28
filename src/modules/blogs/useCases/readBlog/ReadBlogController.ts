import { Request, Response } from "express";
import { BlogRepository } from "../../../../modules/blogs/infrastructure/BlogRepository";
import { ReadBlogUseCase } from "./ReadBlogUseCase";

class ReadBlogController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {

    const { id } = request.params;
    // replace this with tsrynge container to get UseCase instance
    const repo = new BlogRepository;
    const usecase = new ReadBlogUseCase(repo);
    const blog = await usecase.execute(id);

    return response.status(200).json(blog);
  }
}

export { ReadBlogController };

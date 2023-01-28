import { Request, Response } from "express";
import { BlogRepository } from "modules/blogs/infrastructure/BlogRepository";
import { ReadBlogUseCase } from "./ReadBlogUseCase";

class ReadBlogController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {

    // replace this with tsrynge container to get UseCase instance
    const repo = new BlogRepository;
    const usecase = new ReadBlogUseCase(repo);
    const user = await usecase.execute('blogid');

    return response.status(200).json({message: 'template'});
  }
}

export { ReadBlogController };

import { Blog } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import { IBlogCreationDto } from "../../../../modules/blogs/contracts/IBlogCreationDto";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";

class CreateBlogUseCase {

  constructor(private repo: IBlogRepository) {}

  async execute({ description, name, owner }:IBlogCreationDto): Promise<Blog> {

    const existingBlog = await this.repo.findByOwnerId(owner);

    if (existingBlog) {
      throw new AppError('User already has a Blog.');
    }

    const blog = await this.repo.create({ description, name, owner });
    
    return blog;
  }
}

export { CreateBlogUseCase };

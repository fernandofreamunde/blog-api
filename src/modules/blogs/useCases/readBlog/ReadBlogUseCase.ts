import { Blog } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";

class ReadBlogUseCase {

  constructor(private repo: IBlogRepository) {}

  async execute(blog_id: string): Promise<Blog> {

    const blog = await this.repo.findById(blog_id);

    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }

    return blog;
  }
}

export { ReadBlogUseCase };

import { Blog } from "@prisma/client";
import { IBlogUpdateDto } from "modules/blogs/contracts/IBlogUpdateDto";
import { AppError } from "../../../../core/error/AppError";
import { IBlogRepository } from "../../contracts/IBlogRepository";

class UpdateBlogUseCase {

  constructor(private repo: IBlogRepository) {}

  // for now we do not do settings but may be needed in the future... 
  async execute({ id, description, name, owner }:IBlogUpdateDto): Promise<Blog> {

    console.log(id);
    console.log(owner);
    const blog = await this.repo.findById(id);

    if (!blog) {
      throw new AppError('Blog not found.', 404);
    }

    if (blog.owner != owner) {
      throw new AppError('You can only edit your Blog.', 400);
    }

    blog.description = description;
    blog.name = name;

    return  await this.repo.update(blog);
  }
}

export { UpdateBlogUseCase };

import { Article } from "@prisma/client";
import { IArticleCreationDto } from "modules/blogs/contracts/IArticleCreationDto";
import { IArticleRepository } from "modules/blogs/contracts/IArticleRepository";
import { IBlogRepository } from "modules/blogs/contracts/IBlogRepository";
import { AppError } from "../../../../core/error/AppError";


class CreateArticleUseCase {

  constructor(
    private repo: IArticleRepository,
    private blogRepo: IBlogRepository,
  ) {}

  async execute({body, title, published_at, author, blog}: IArticleCreationDto): Promise<Article> {

    const blogExists = await this.blogRepo.findById(blog);
    if (!blogExists || blogExists.owner != author) {
      throw new AppError("Wrong blog_id provided.", 400);  
    }

    const article = await this.repo.create({body, title, published_at,author, blog});
    
    return article;
  }
}

export { CreateArticleUseCase };

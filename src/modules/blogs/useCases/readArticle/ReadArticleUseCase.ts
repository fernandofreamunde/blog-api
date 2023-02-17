import { Article } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";

class ReadArticleUseCase {

  constructor(private repo: IArticleRepository) { }

  async execute(article_id: string): Promise<Article> {
    const article = await this.repo.findById(article_id);

    if (!article) {
      throw new AppError("Article not found.", 404);
    }

    return article;
  }
}

export { ReadArticleUseCase };

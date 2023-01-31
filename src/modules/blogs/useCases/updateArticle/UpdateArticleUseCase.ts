import { Article } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";

interface IRequest { 
  id: string;
  title: string;
  body: object;
  published_at: Date | null;
  user_id: string;
}

class UpdateArticleUseCase {

  constructor(
    private repo: IArticleRepository
  ) {}

  async execute({ id, title, body, published_at, user_id }: IRequest): Promise<Article> {

    const article = await this.repo.findById(id);

    if (!article) {
      throw new AppError("Article not found.", 404);
    }

    if (article?.author !== user_id) {
      throw new AppError("You cannot update this article.", 400);
    }

    article.title = title;
    article.body = body;
    article.published_at = published_at;

    return await this.repo.update(article);
  }
}

export { UpdateArticleUseCase };

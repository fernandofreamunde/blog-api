import { AppError } from "../../../../core/error/AppError";
import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";

interface IRequest { 
  id: string;
  user_id: string;
}

class DeleteArticleUseCase {

  constructor(
    private repo: IArticleRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {

    const article = await this.repo.findById(id);

    if (!article) {
      throw new AppError("Article not found.", 404);
    }

    if (article?.author !== user_id) {
      throw new AppError("You cannot delete this article.", 400);
    }

    await this.repo.delete(article);
    
    return;
  }
}

export { DeleteArticleUseCase };

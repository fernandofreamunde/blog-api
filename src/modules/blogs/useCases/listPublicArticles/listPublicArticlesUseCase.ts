import { Article } from "@prisma/client";
import { IArticleRepository } from "../../contracts/IArticleRepository";

class ListPublicArticlesUseCase {

  constructor(private repo: IArticleRepository) { }

  async execute(): Promise<Article[]> {

    return await this.repo.findPublic();
  }
}

export { ListPublicArticlesUseCase };

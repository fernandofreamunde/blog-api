import { Article } from "@prisma/client";
import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";

class ListAllArticlesUseCase {

  constructor(private repo: IArticleRepository) { }

  async execute(): Promise<Article[]> {

    return await this.repo.findAll();
  }
}

export { ListAllArticlesUseCase };

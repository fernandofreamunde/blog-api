import { Article } from "@prisma/client";
import { IArticleCreationDto } from "./IArticleCreationDto";

interface IArticleRepository {
  findPublic(): Promise<Article[]>;
  findById(id: string): Promise<Article | null>;
  findByAuthorId(author: string): Promise<Article | null>;
  create(article: IArticleCreationDto): Promise<Article>;
  update(article: Article): Promise<Article>;
  delete(article: Article): Promise<void>;
}

export { IArticleRepository };

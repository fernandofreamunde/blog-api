import { Article } from "@prisma/client";
import { IArticleCreationDto } from "./IArticleCreationDto";

interface IArticleRepository {
  findById(id: string): Promise<Article | null>; 
  findByAuthorId(author: string): Promise<Article | null>; 
  create(data: IArticleCreationDto): Promise<Article>;
  update(data: Article): Promise<Article>;
}

export { IArticleRepository };

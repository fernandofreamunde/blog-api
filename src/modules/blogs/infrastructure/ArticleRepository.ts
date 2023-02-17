import { Article, Prisma, PrismaClient } from "@prisma/client";
import { IArticleCreationDto } from "../contracts/IArticleCreationDto";
import { IArticleRepository } from "../contracts/IArticleRepository";

class ArticleRepository implements IArticleRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findPublic(): Promise<Article[]> {

    return await this.prisma.article.findMany({
      where: {
        published_at: {
          lte: new Date(),
        }
      }
    });
  }

  async findAll(): Promise<Article[]> {
    return await this.prisma.article.findMany();
  }

  async findByAuthorId(author: string): Promise<Article | null> {
    return await this.prisma.article.findFirst({
      where: {
        author
      }
    });
  }

  async findById(id: string): Promise<Article | null> {
    return await this.prisma.article.findUnique({
      where: {
        id
      }
    });
  }

  async create(data: IArticleCreationDto): Promise<Article> {
    const { title, body, author, published_at, blog } = data;
    const updated_at = new Date();

    return await this.prisma.article.create({
      data: {
        title,
        body,
        author,
        published_at,
        blog,
        updated_at,
      },
    });
  }

  async update({ id, title, body, author, published_at, blog }: Article): Promise<Article> {
    const updated_at = new Date();
    const json = body as Prisma.JsonArray;

    return await this.prisma.article.update({
      data: {
        title,
        body: json,
        author,
        published_at,
        blog
      },
      where: {
        id: id
      }
    });
  }

  async delete(article: Article): Promise<void> {

    await this.prisma.article.delete({
      where: {
        id: article.id
      }
    });
  }
}

export { ArticleRepository };

import { Article } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { IArticleCreationDto } from "../contracts/IArticleCreationDto";
import { IArticleRepository } from "../contracts/IArticleRepository";
import { DayjsDateProvider } from "../../../core/providers/date/DayJsProvider";
import { IDateProvider } from "../../../core/providers/date/IDateProvider";

class MockArticleRepository implements IArticleRepository {

  articles: Article[];
  dateProvider: IDateProvider;

  constructor() {
    this.articles = [];
    this.dateProvider = new DayjsDateProvider();
  }

  async findPublic(): Promise<Article[]> {
    return this.articles.filter((article) => this.dateProvider.isInPast(article.published_at as Date));
  }

  async findAll(): Promise<Article[]> {
    return this.articles;
  }

  async findByAuthorId(author: string): Promise<Article | null> {
    return this.articles.find((article) => article.author === author) ?? null;
  }

  async findById(id: string): Promise<Article | null> {
    return this.articles.find((article) => article.id === id) ?? null;
  }

  async create(data: IArticleCreationDto): Promise<Article> {
    const { author, blog, body, title, published_at } = data;
    const id = uuidV4();
    const created_at = new Date();
    const updated_at = new Date();
    const publishedAt = published_at ?? null;

    const article = {
      id,
      author,
      blog,
      body,
      title,
      published_at: publishedAt,
      created_at,
      updated_at,
    }

    await this.articles.push(article);

    return article;
  }

  async update(article: Article): Promise<Article> {
    const existingArticle = await this.findById(article.id);

    if (!existingArticle) {
      throw new Error("Article not found.");
    }

    const index = this.articles.indexOf(existingArticle);

    this.articles[index] = article;

    return article;
  }

  async delete(article: Article): Promise<void> {
    const articleIndex = this.articles.indexOf(article);

    if (articleIndex === -1) {
      return;
    }

    this.articles.splice(articleIndex, 1);
  }
}

export { MockArticleRepository };

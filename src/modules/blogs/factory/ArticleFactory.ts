import { faker } from "@faker-js/faker";
import { Article } from "@prisma/client";
import { IArticleRepository } from "../contracts/IArticleRepository";

interface IArticleSeed {
  title?: string;
  body?: object;
  author: string;
  blog: string;
  published_at?: Date;
}

interface IMakeBlog {
  data: IArticleSeed;
  repo: IArticleRepository;
}

export default async function makeArticle({ data, repo }: IMakeBlog): Promise<Article> {
  const { title, body, published_at, author, blog } = data;

  const article = await repo.create({

    title: title ?? faker.lorem.sentence(),
    body: body ?? fakeBodyWithNParagraphs(Number(faker.random.numeric())),
    author,
    blog,
    published_at: published_at ?? null
  }) as Article;

  return article;
}

function fakeBodyWithNParagraphs(n: number) {
  const body = [];

  for (let index = 0; index < n; index++) {
    body.push({
      type: 'paragraph',
      content: faker.lorem.paragraph(),
      metadata: [],
      translations: [
        {
          language: 'pt_pt',
          content: faker.lorem.paragraph(),
          metadata: [],
        }
      ]
    });
  }

  return body;
}

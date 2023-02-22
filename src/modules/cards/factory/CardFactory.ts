import { faker } from "@faker-js/faker";
import { Card } from "@prisma/client";
import { ICardRepository } from "../contracts/ICardRepository";

interface ICardSeed {
  name?: string;
  description?: string;
  type?: string;
  data?: object;
  blog_id?: string;
  published_at?: Date;
}

interface IMakeCard {
  objectData: ICardSeed;
  repo: ICardRepository;
}

export default async function makeCard({ objectData, repo }: IMakeCard): Promise<Card> {
  const {
    name,
    description,
    type,
    data,
    blog_id,
    published_at
  } = objectData;

  const card = await repo.create({
    description: description ?? faker.lorem.sentence(),
    name: name ?? faker.company.name(),
    type: type ?? faker.lorem.word(),
    data: data ?? { message: faker.lorem.sentence() },
    published_at: published_at ?? null,
    blog: blog_id ?? `fake-blog-uuid-${faker.random.numeric(4)}`
  }) as Card;

  return card;
}

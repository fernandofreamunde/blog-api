import { faker } from "@faker-js/faker";
import { Blog } from "@prisma/client";
import { IBlogRepository } from "../contracts/IBlogRepository";

interface IBlogSeed {
  name?: string;
  description?: string;
  owner_id: string;
}

interface IMakeBlog {
  data: IBlogSeed;
  repo: IBlogRepository;
}

export default async function makeBlog({data, repo}:IMakeBlog): Promise<Blog | null> {
  const {
    name,
    description, 
    owner_id
  }= data;

  const blog = await repo.create({
    description: description ?? faker.lorem.sentence(),
    name: name ?? faker.company.name(),
    owner: owner_id,
  });

  return blog;
}

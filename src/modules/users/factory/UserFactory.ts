import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { IUserRepository } from "../contracts/IUserRepository";

interface IUserSeed {
  name?: string;
  email?: string;
}

interface IMakeAccount {
  data: IUserSeed;
  repo: IUserRepository;
}

export default async function makeUser({data, repo}:IMakeAccount): Promise<User | null> {
  const {
    name,
    email,
  } = data;

  const password = await hash('password', 8);

  const user = await repo.create({
    email: email ?? faker.internet.email(name),
    name: name ?? faker.name.firstName(),
    password
  });

  return user;
}

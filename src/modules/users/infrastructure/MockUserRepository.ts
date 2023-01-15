import { User } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { IUserInputDto } from "../contracts/IUserInputDto";
import { IUserRepository } from "../contracts/IUserRepository";

class MockUserRepository implements IUserRepository{
  
  users: User[];

  constructor() {
    this.users = [];
  }

  async findByEmail(email: string): Promise<User|undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(data: IUserInputDto): Promise<User> {
    const { name, email, password, } = data;
    const id = uuidV4();
    const bio = null;
    const is_admin = false;
    const status = "inactive";
    const created_at = new Date();
    const updated_at = new Date();

    const user = {
      id,
      email,
      password,
      name,
      bio,
      is_admin,
      status,
      created_at,
      updated_at
    }

    await this.users.push(user);

    return user;
  }
}

export { MockUserRepository };

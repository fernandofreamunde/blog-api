import { User } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { IUserInputDto } from "../contracts/IUserInputDto";
import { IUserRepository } from "../contracts/IUserRepository";

class MockUserRepository implements IUserRepository{
  
  users: User[];

  constructor() {
    this.users = [];
  }

  async findByEmail(email: string): Promise<User|null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
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

  async update(user: User): Promise<User> {
    const existingUser = await this.findById(user.id);

    if (!existingUser) {
      throw new Error("User not found.");
    }
    
    const index = this.users.indexOf(existingUser);

    this.users[index] = user;

    return user;
  }
}

export { MockUserRepository };

import { PrismaClient, User } from "@prisma/client";
import { IUserInputDto } from "../contracts/IUserInputDto";
import { IUserRepository } from "../contracts/IUserRepository";

class UserRepository implements IUserRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async create(data: IUserInputDto): Promise<User> {
    const { name, email, password, } = data;
    const bio = null;
    const is_admin = false;
    const status = "inactive";
    const created_at = new Date();
    const updated_at = new Date();

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        bio,
        is_admin,
        status,
      },
    });
  }

  async update(user: User): Promise<User> {
    user.updated_at = new Date();

    return await this.prisma.user.update({
      data: user,
      where: {
        id: user.id
      }
    });
  }
}

export { UserRepository };

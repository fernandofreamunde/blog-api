import { Blog, PrismaClient } from "@prisma/client";
import { IBlogCreationDto } from "../contracts/IBlogCreationDto";
import { IBlogRepository } from "../contracts/IBlogRepository";

class BlogRepository implements IBlogRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByOwnerId(owner: string): Promise<Blog | null> {
    return await this.prisma.blog.findFirst({
      where: {
        owner
      }
    });
  }

  async findById(id: string): Promise<Blog | null> {
    return await this.prisma.blog.findUnique({
      where: {
        id
      }
    });
  }

  async create(data: IBlogCreationDto): Promise<Blog> {
    const { name, description, owner } = data;
    const settings = {};
    const updated_at = new Date();

    return await this.prisma.blog.create({
      data: {
        name,
        description,
        owner,
        settings,
        updated_at
      },
    });
  }

  // TODO: check on settings thing
  async update({created_at, description, id, name, owner, settings}: Blog): Promise<Blog> {
    const updated_at = new Date();

    return await this.prisma.blog.update({
      data: {
        created_at,
        description,
        id,
        name,
        owner,
        settings: {},
        updated_at
      },
      where: {
        id: id
      }
    });
  }
}

export { BlogRepository };

import { Blog } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { IBlogCreationDto } from "../contracts/IBlogCreationDto";
import { IBlogRepository } from "../contracts/IBlogRepository";

class MockBlogRepository implements IBlogRepository{
  
  blogs: Blog[];

  constructor() {
    this.blogs = [];
  }
  
  async findByOwnerId(owner: string): Promise<Blog | null> {
    return this.blogs.find((blog) => blog.owner === owner) ?? null;
  }

  async findById(id: string): Promise<Blog | null> {
    return this.blogs.find((blog) => blog.id === id) ?? null;
  }

  async create(data: IBlogCreationDto): Promise<Blog> {
    const { name, description, owner } = data;
    const id = uuidV4();
    const settings = {};
    const created_at = new Date();
    const updated_at = new Date();

    const blog = {
      id,
      name,
      description,
      owner,
      settings,
      created_at,
      updated_at
    }

    this.blogs.push(blog);

    return blog;
  }

  async update(blog: Blog): Promise<Blog> {
    const existingUser = await this.findById(blog.id);

    if (!existingUser) {
      throw new Error("Blog not found.");
    }
    
    const index = this.blogs.indexOf(existingUser);

    this.blogs[index] = blog;

    return blog;
  }
}

export { MockBlogRepository };

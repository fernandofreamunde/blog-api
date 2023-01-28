import { Blog } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";
import makeBlog from "../../../../modules/blogs/factory/BlogFactory";
import { MockBlogRepository } from "../../../../modules/blogs/infrastructure/MockBlogRepository";
import { ReadBlogUseCase } from "./ReadBlogUseCase";

let blogRepo: IBlogRepository;
let useCase: ReadBlogUseCase;

describe("Read Blog test", () => {

  beforeEach(() => {
    blogRepo = new MockBlogRepository();
    useCase = new ReadBlogUseCase(blogRepo);
  });

  it('should read existing blog', async () => {

    const blog = await makeBlog({repo: blogRepo, data: { name: 'My Blog', description: 'My personal Blog', owner_id: 'some-fake-uuid-0001' }}) as Blog;
    const result = await useCase.execute(blog.id);

    expect(result).toEqual(blog);
  });

  it('should not read non existing blog', async () => {
    
    // TODO: make this more specific.
    expect(async () => {
      const blog = await useCase.execute('some-fake-uuid-0001');
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

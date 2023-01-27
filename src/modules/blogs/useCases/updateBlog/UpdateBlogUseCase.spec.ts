import { Blog } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import makeBlog from "../../../../modules/blogs/factory/BlogFactory";
import { IBlogRepository } from "../../contracts/IBlogRepository";
import { MockBlogRepository } from "../../infrastructure/MockBlogRepository";
import { UpdateBlogUseCase } from "./UpdateBlogUseCase";

let blogRepo: IBlogRepository;
let useCase: UpdateBlogUseCase;

describe("Update Blog test", () => {

  beforeEach(() => {
    blogRepo = new MockBlogRepository();
    useCase = new UpdateBlogUseCase(blogRepo);
  });

  it('should allow user to update a blog', async () => {

    const madeBlog = await makeBlog({repo: blogRepo, data: { name: 'My Blog', description: 'My personal Blog', owner_id: 'some-fake-uuid-0001' }}) as Blog;

    const blog = await useCase.execute({ id: madeBlog.id, name: 'ScrewAttack', description: 'My videogame Blog', owner: 'some-fake-uuid-0001' });

    expect(blog.id).toEqual(madeBlog.id);
    expect(blog.name).toEqual('ScrewAttack');
    expect(blog.description).toEqual('My videogame Blog');
    expect(blog.owner).toEqual('some-fake-uuid-0001');
  });

  it('should not allow user to update someone else blog', async () => {
    
    await makeBlog({repo: blogRepo, data: { owner_id: 'some-fake-uuid-0001' }}) as Blog;
    const madeBlog = await makeBlog({repo: blogRepo, data: { name: 'My Blog', description: 'My personal Blog', owner_id: 'some-fake-uuid-0002' }}) as Blog;
     // TODO: make this more specific.
     expect(async () => {
      const blog = await useCase.execute({ id: madeBlog.id, name: 'ScrewAttack', description: 'My videogame Blog', owner: 'some-fake-uuid-0001' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should only allow user to update existing blogs', async () => {
    
     // TODO: make this more specific.
     expect(async () => {
      const blog = await useCase.execute({ id: 'blog-fake-uuid-0001', name: 'ScrewAttack', description: 'My videogame Blog', owner: 'some-fake-uuid-0001' });
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

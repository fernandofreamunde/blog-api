import { AppError } from "../../../../core/error/AppError";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";
import { MockBlogRepository } from "../../../../modules/blogs/infrastructure/MockBlogRepository";
import { CreateBlogUseCase } from "./CreateBlogUseCase";

let blogRepo: IBlogRepository;
let useCase: CreateBlogUseCase;

describe("Create Blog test", () => {

  beforeEach(() => {
    blogRepo = new MockBlogRepository();
    useCase = new CreateBlogUseCase(blogRepo);
  });

  it('should allow user to create a blog', async () => {

    const blog = await useCase.execute({name: 'My Blog', description: 'My personal Blog', owner: 'some-fake-uuid'});
    expect(blog).toBeDefined();
    expect(blog.id).toBeDefined();
    expect(blog.name).toEqual('My Blog');
    expect(blog.description).toEqual('My personal Blog');
    expect(blog.owner).toEqual('some-fake-uuid');
    expect(blog.settings).toEqual({});
    expect(blog.created_at).toBeInstanceOf(Date);
    expect(blog.updated_at).toBeInstanceOf(Date);
  });

  it('should not allow user with a blog to create another blog', async () => {
    
    await useCase.execute({name: 'My Blog', description: 'My professional Blog', owner: 'some-fake-uuid'});
     // TODO: make this more specific.
     expect(async () => {
      const result = await useCase.execute({name: 'My second Blog', description: 'My personal Blog', owner: 'some-fake-uuid'});
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

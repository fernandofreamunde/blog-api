import { faker } from "@faker-js/faker";
import { AppError } from "../../../../core/error/AppError";
import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";
import makeBlog from "../../../../modules/blogs/factory/BlogFactory";
import { MockArticleRepository } from "../../../../modules/blogs/infrastructure/MockArticleRepository";
import { MockBlogRepository } from "../../../../modules/blogs/infrastructure/MockBlogRepository";
import { CreateArticleUseCase } from "./CreateArticleUseCase";

let repo: IArticleRepository;
let blogRepo: IBlogRepository;
let useCase: CreateArticleUseCase;

describe("Create Article test", () => {

  beforeEach(() => {
    repo = new MockArticleRepository();
    blogRepo = new MockBlogRepository();
    useCase = new CreateArticleUseCase(repo, blogRepo);
  });

  it('should allow a user to create an article on a blog belonging to him', async () => {

    // todo: replace this with a make user and set owner witht an actual user.
    const blog = await makeBlog({data:{ owner_id: 'some-fake-uuid-0001' }, repo: blogRepo});
    const title = faker.lorem.words(5);
    const body = [
      {
        type: 'paragraph',
        content: faker.lorem.paragraph(),
        metadata: [],
        translations: [
          {
            language: 'pt_pt',
            content: faker.lorem.paragraph(),
            metadata: [],
          }
        ]
      }
    ];

    const newArticle = await useCase.execute({blog: blog.id, author: 'some-fake-uuid-0001', body, title, published_at: null})
    expect(newArticle.body).toEqual(body);
    expect(newArticle.blog).toEqual(blog.id);
    expect(newArticle.published_at).toBeNull();
    expect(newArticle.title).toEqual(title);
    expect(newArticle.author).toEqual('some-fake-uuid-0001');
    expect(newArticle.created_at).toBeInstanceOf(Date);
    expect(newArticle.updated_at).toBeInstanceOf(Date);
  });

  it('should not allow a user to create an article on an unexisting blog', async () => {
    const title = faker.lorem.words(5);
    const body = {
      content: [
        {
          type: 'paragraph',
          content: faker.lorem.paragraph(),
          metadata: [],
          translations: [
            {
              language: 'pt_pt',
              content: faker.lorem.paragraph(),
              metadata: [],
            }
          ]
        }
      ]
    }
    
    expect(async () => {
      const newArticle = await useCase.execute({blog: 'some-fake-uuid-0001', author: 'some-fake-uuid-0001', body, title, published_at: null})
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow to create an article on a blog that user does not own', async () => {
    const blog = await makeBlog({data:{ owner_id: 'some-fake-uuid-0001' }, repo: blogRepo});
    const title = faker.lorem.words(5);
    const body = [
      {
        type: 'paragraph',
        content: faker.lorem.paragraph(),
        metadata: [],
        translations: [
          {
            language: 'pt_pt',
            content: faker.lorem.paragraph(),
            metadata: [],
          }
        ]
      }
    ];
    
    expect(async () => {
      const newArticle = await useCase.execute({blog: blog.id, author: 'some-fake-uuid-0002', body, title, published_at: null})
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

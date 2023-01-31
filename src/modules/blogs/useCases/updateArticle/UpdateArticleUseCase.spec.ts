import makeArticle from "../../../../modules/blogs/factory/ArticleFactory";
import { IUserRepository } from "../../../../modules/users/contracts/IUserRepository";
import makeUser from "../../../../modules/users/factory/UserFactory";
import { MockUserRepository } from "../../../../modules/users/infrastructure/MockUserRepository";
import { AppError } from "../../../../core/error/AppError";
import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";
import makeBlog from "../../../../modules/blogs/factory/BlogFactory";
import { MockArticleRepository } from "../../../../modules/blogs/infrastructure/MockArticleRepository";
import { MockBlogRepository } from "../../../../modules/blogs/infrastructure/MockBlogRepository";
import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

let repo: IArticleRepository;
let blogRepo: IBlogRepository;
let userRepo: IUserRepository;
let useCase: UpdateArticleUseCase;

describe("Update Article test", () => {

  beforeEach(() => {
    repo = new MockArticleRepository();
    blogRepo = new MockBlogRepository();
    userRepo = new MockUserRepository();
    useCase = new UpdateArticleUseCase(repo);
  });

  it('should allow a user to update an article on a blog belonging to him', async () => {

    const user = await makeUser({data:{}, repo: userRepo});
    const blog = await makeBlog({data:{ owner_id: user.id }, repo: blogRepo});
    const article = await makeArticle({data:{ author: user.id, blog: blog.id }, repo});
    const title = 'New Title';
    const body = [
      {
        type: 'paragraph',
        content: 'My simple paragraph.',
        metadata: [],
        translations: [
          {
            language: 'pt_pt',
            content: 'O meu paragrafo simples.',
            metadata: [],
          }
        ]
      }
    ];
    const published_at = new Date();

    const updatedArticle = await useCase.execute({ id: article.id, title, body, published_at, user_id: user.id })
    expect(updatedArticle.body).toEqual(body);
    expect(updatedArticle.published_at).toEqual(published_at);
    expect(updatedArticle.title).toEqual(title);
    expect(updatedArticle.author).toEqual(user.id);
    expect(updatedArticle.created_at).toBeInstanceOf(Date);
  });

  it('should not allow a user to update an article that does not belong to him', async () => {
    
    const user = await makeUser({data:{}, repo: userRepo});
    const user2 = await makeUser({data:{}, repo: userRepo});
    const blog = await makeBlog({data:{ owner_id: user.id }, repo: blogRepo});
    const article = await makeArticle({data:{ author: user.id, blog: blog.id }, repo});
    const title = 'New Title';
    const body = [
      {
        type: 'paragraph',
        content: 'My simple paragraph.',
        metadata: [],
        translations: [
          {
            language: 'pt_pt',
            content: 'O meu paragrafo simples.',
            metadata: [],
          }
        ]
      }
    ];
    const published_at = new Date();

    expect(async () => {
      await useCase.execute({ id: article.id, title, body, published_at, user_id: user2.id })
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

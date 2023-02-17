import { MockArticleRepository } from "../../../../modules/blogs/infrastructure/MockArticleRepository";
import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";
import { ReadArticleUseCase } from "./ReadArticleUseCase";
import makeArticle from "../../../../modules/blogs/factory/ArticleFactory";
import makeUser from "../../../../modules/users/factory/UserFactory";
import makeBlog from "../../../../modules/blogs/factory/BlogFactory";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";
import { IUserRepository } from "../../../../modules/users/contracts/IUserRepository";
import { MockBlogRepository } from "../../../../modules/blogs/infrastructure/MockBlogRepository";
import { MockUserRepository } from "../../../../modules/users/infrastructure/MockUserRepository";
import { AppError } from "../../../../core/error/AppError";

let repo: IArticleRepository;
let useCase: ReadArticleUseCase;
let blogRepo: IBlogRepository;
let userRepo: IUserRepository;

describe("Read single Article test", () => {
  beforeEach(() => {
    repo = new MockArticleRepository();
    blogRepo = new MockBlogRepository();
    userRepo = new MockUserRepository();
    useCase = new ReadArticleUseCase(repo);
  });

  it('should read existing Article', async () => {

    const user = await makeUser({ data: {}, repo: userRepo });
    const blog = await makeBlog({ data: { owner_id: user.id }, repo: blogRepo });
    const article = await makeArticle({ data: { author: user.id, blog: blog.id }, repo });
    const result = await useCase.execute(article.id);

    expect(result).toEqual(article);
  });

  it('should not read non existing Article', async () => {

    // TODO: make this more specific.
    expect(async () => {
      const article = await useCase.execute('some-fake-uuid-0001');
    }).rejects.toBeInstanceOf(AppError);
  });

});

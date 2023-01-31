import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";
import { DeleteArticleUseCase } from "./DeleteArticleUseCase";
import { IBlogRepository } from "../../../../modules/blogs/contracts/IBlogRepository";
import { IUserRepository } from "../../../../modules/users/contracts/IUserRepository";
import { MockArticleRepository } from "../../../../modules/blogs/infrastructure/MockArticleRepository";
import { MockBlogRepository } from "../../../../modules/blogs/infrastructure/MockBlogRepository";
import { MockUserRepository } from "../../../../modules/users/infrastructure/MockUserRepository";
import makeUser from "../../../../modules/users/factory/UserFactory";
import makeBlog from "../../../../modules/blogs/factory/BlogFactory";
import makeArticle from "../../../../modules/blogs/factory/ArticleFactory";
import { AppError } from "../../../../core/error/AppError";

let repo: IArticleRepository;
let blogRepo: IBlogRepository;
let userRepo: IUserRepository;
let useCase: DeleteArticleUseCase;

describe("Delete Article test", () => {

  beforeEach(() => {
    repo = new MockArticleRepository();
    blogRepo = new MockBlogRepository();
    userRepo = new MockUserRepository();
    useCase = new DeleteArticleUseCase(repo);
  });

  it('should allow a user to delete an article on a blog belonging to him', async () => {

    const user = await makeUser({ data: {}, repo: userRepo });
    const blog = await makeBlog({ data: { owner_id: user.id }, repo: blogRepo });
    const article = await makeArticle({ data: { author: user.id, blog: blog.id }, repo });

    const deletedArticle = await useCase.execute({ id: article.id, user_id: user.id });

    expect(undefined).toEqual(deletedArticle);
  });

  it('should not allow a user to delete an article they do not own', async () => {

    const user = await makeUser({ data: {}, repo: userRepo });
    const user2 = await makeUser({ data: {}, repo: userRepo });
    const blog = await makeBlog({ data: { owner_id: user2.id }, repo: blogRepo });
    const article = await makeArticle({ data: { author: user.id, blog: blog.id }, repo });

    expect(async () => {
      await useCase.execute({ id: article.id, user_id: user2.id });
    }).rejects.toBeInstanceOf(AppError);
  });

});

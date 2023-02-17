import { IArticleRepository } from "../../../../modules/blogs/contracts/IArticleRepository";
import { ListAllArticlesUseCase } from "./ListAllArticlesUseCase";
import { MockArticleRepository } from "../../../../modules/blogs/infrastructure/MockArticleRepository";
import makeArticle from "../../../../modules/blogs/factory/ArticleFactory";
import { DayjsDateProvider } from "../../../../core/providers/date/DayJsProvider";

let repo: IArticleRepository;
let useCase: ListAllArticlesUseCase;

describe("List All Articles Use Case test", () => {
  beforeEach(() => {
    repo = new MockArticleRepository();
    useCase = new ListAllArticlesUseCase(repo);
  });

  it('should list All articles', async () => {
    const dateProvider = new DayjsDateProvider();
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.subtractDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.subtractDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.subtractDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.addDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.addDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001" }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001" }, repo });

    const result = await useCase.execute();
    expect(result.length).toEqual(7);
  });

});

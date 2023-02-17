import { IArticleRepository } from "../../contracts/IArticleRepository";
import { ListPublicArticlesUseCase } from "./ListPublicArticlesUseCase";
import { MockArticleRepository } from "../../infrastructure/MockArticleRepository";
import makeArticle from "../../factory/ArticleFactory";
import { DayjsDateProvider } from "../../../../core/providers/date/DayJsProvider";

let repo: IArticleRepository;
let useCase: ListPublicArticlesUseCase;

describe("List Public Artcles test", () => {
  beforeEach(() => {
    repo = new MockArticleRepository();
    useCase = new ListPublicArticlesUseCase(repo);
  });

  it('should list only public articles', async () => {
    const dateProvider = new DayjsDateProvider();
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.subtractDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.subtractDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.subtractDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.addDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001", published_at: dateProvider.addDays(new Date(), 3) }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001" }, repo });
    await makeArticle({ data: { author: "some-fake-user-uuid-0001", blog: "some-fake-blog-uuid-0001" }, repo });

    const result = await useCase.execute();
    expect(result.length).toEqual(3);
  });

});
// Todo rename the files on list Publish articles
// ! make the read all articles

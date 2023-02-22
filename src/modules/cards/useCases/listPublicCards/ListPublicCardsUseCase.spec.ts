import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";
import { MockCardRepository } from "../../../../modules/cards/infrastructure/MockCardRepository";
import makeCard from "../../../../modules/cards/factory/CardFactory";
import { ListPublicCardsUseCase } from "./ListPublicCardsUseCase";
import { IDateProvider } from "../../../../core/providers/date/IDateProvider";
import { DayjsDateProvider } from "../../../../core/providers/date/DayJsProvider";

let repo: ICardRepository;
let usecase: ListPublicCardsUseCase;
let date: IDateProvider;

describe("List All Public Cards test", () => {

  beforeEach(() => {
    repo = new MockCardRepository();
    usecase = new ListPublicCardsUseCase(repo);
    date = new DayjsDateProvider();
  });

  it('should return all public cards', async () => {

    await makeCard({ objectData: { published_at: date.subtractDays(new Date(), 1) }, repo });
    await makeCard({ objectData: { published_at: date.subtractDays(new Date(), 1) }, repo });
    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: { published_at: date.subtractDays(new Date(), 1) }, repo });
    await makeCard({ objectData: { published_at: date.subtractDays(new Date(), 1) }, repo });

    const list = await usecase.execute();
    expect(list.length).toEqual(4);
  });

  it('should return empty list', async () => {
    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: {}, repo });

    const list = await usecase.execute();
    expect(list.length).toEqual(0);
  });

});
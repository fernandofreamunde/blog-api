import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";
import { ListAllCardsUseCase } from "./ListAllCardsUseCase";
import { MockCardRepository } from "../../../../modules/cards/infrastructure/MockCardRepository";
import makeCard from "../../../../modules/cards/factory/CardFactory";

let repo: ICardRepository;
let usecase: ListAllCardsUseCase;

describe("List All Cards test", () => {

  beforeEach(() => {
    repo = new MockCardRepository();
    usecase = new ListAllCardsUseCase(repo);
  });

  it('should return all existing cards', async () => {

    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: {}, repo });
    await makeCard({ objectData: {}, repo });

    const list = await usecase.execute();
    expect(list.length).toEqual(4);
  });

  it('should return empty list', async () => {

    const list = await usecase.execute();
    expect(list.length).toEqual(0);
  });

});

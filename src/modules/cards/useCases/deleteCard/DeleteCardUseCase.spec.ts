import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";
import { DeleteCardUseCase } from "./DeleteCardUseCase";
import { MockCardRepository } from "../../../../modules/cards/infrastructure/MockCardRepository";
import makeCard from "../../../../modules/cards/factory/CardFactory";
import { AppError } from "../../../../core/error/AppError";

let repo: ICardRepository;
let useCase: DeleteCardUseCase;

describe("Delete Card Test test", () => {

  beforeEach(() => {
    repo = new MockCardRepository();
    useCase = new DeleteCardUseCase(repo);
  });

  it('should allow a user to delete a card', async () => {
    const card = await makeCard({ objectData: {}, repo });

    const deletedCard = await useCase.execute(card.id);

    expect(undefined).toEqual(deletedCard);
  });

  it('should not allow a user to delete a non existing card', async () => {

    expect(async () => {
      await useCase.execute('fake-card-uuid-0001');
    }).rejects.toBeInstanceOf(AppError);
  });

});

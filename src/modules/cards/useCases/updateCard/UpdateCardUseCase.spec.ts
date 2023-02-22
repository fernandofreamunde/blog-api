import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";
import { UpdateCardUseCase } from "./UpdateCardUseCase";
import makeCard from "../../../../modules/cards/factory/CardFactory";
import { MockCardRepository } from "../../../../modules/cards/infrastructure/MockCardRepository";
import { AppError } from "../../../../core/error/AppError";

let repo: ICardRepository;
let useCase: UpdateCardUseCase;

describe("Update Card Use Case test", () => {

  beforeEach(() => {
    repo = new MockCardRepository();
    useCase = new UpdateCardUseCase(repo);
  });

  it('should allow to update an existing card', async () => {

    const card = await makeCard({ objectData: {}, repo });
    const updatedCard = await useCase.execute({
      id: card.id,
      name: 'may new card',
      description: 'a test card',
      type: 'test card',
      published_at: null,
      data: { content: 'test', link: 'http://example.com' }
    });

    expect(updatedCard.name).toEqual('may new card');
    expect(updatedCard.description).toEqual('a test card');
    expect(updatedCard.type).toEqual('test card');
    expect(updatedCard.published_at).toEqual(null);
    expect(updatedCard.data).toEqual({ content: 'test', link: 'http://example.com' });
  });

  it('should not allow to update an unexisting card', async () => {

    const card = await makeCard({ objectData: {}, repo });
    const updatedCard = await useCase.execute({
      id: card.id,
      name: 'may new card',
      description: 'a test card',
      type: 'test card',
      published_at: null,
      data: { content: 'test', link: 'http://example.com' }
    });

    expect(async () => {
      await useCase.execute({
        id: 'some-fake-card-uuid-01',
        name: 'may new card',
        description: 'a test card',
        type: 'test card',
        published_at: null,
        data: { content: 'test', link: 'http://example.com' }
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});

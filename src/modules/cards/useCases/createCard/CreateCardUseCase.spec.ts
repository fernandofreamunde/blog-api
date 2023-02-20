import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";
import { CreateCardUseCase } from "./CreateCardUseCase";
import { MockCardRepository } from "../../../../modules/cards/infrastructure/MockCardRepository";

let repo: ICardRepository;
let useCase: CreateCardUseCase;

describe("Create Card Usecase test", () => {

  beforeEach(() => {
    repo = new MockCardRepository();
    useCase = new CreateCardUseCase(repo);
  });

  it('should allow to create a card', async () => {

    const data = { link: 'https://portuguesethings.com' };
    const newCard = await useCase.execute({
      blog: 'some-fake-uuid-0001',
      name: 'Card Name',
      description: 'my test card',
      type: 'ad',
      data,
      published_at: null
    });

    expect(newCard.data).toEqual(data);
    expect(newCard.blog).toEqual('some-fake-uuid-0001');
    expect(newCard.published_at).toBeNull();
    expect(newCard.name).toEqual('Card Name');
    expect(newCard.description).toEqual('my test card');
    expect(newCard.type).toEqual('ad');
    expect(newCard.created_at).toBeInstanceOf(Date);

  });
});

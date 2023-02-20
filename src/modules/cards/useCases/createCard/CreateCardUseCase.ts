import { Card } from "@prisma/client";
import { ICardCreationDto } from "../../../../modules/cards/contracts/ICardCreationDto";
import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";

class CreateCardUseCase {

  constructor(private repo: ICardRepository) { }

  async execute(cardData: ICardCreationDto): Promise<Card> {

    const card = this.repo.create(cardData);

    return card;
  }
}

export { CreateCardUseCase };

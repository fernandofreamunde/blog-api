import { Card } from "@prisma/client";
import { ICardRepository } from "modules/cards/contracts/ICardRepository";

class ListPublicCardsUseCase {

  constructor(private repo: ICardRepository) { }

  async execute(): Promise<Card[]> {
    return await this.repo.findPublic();
  }
}

export { ListPublicCardsUseCase };

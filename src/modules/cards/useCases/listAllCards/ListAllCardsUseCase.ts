import { Card } from "@prisma/client";
import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";

class ListAllCardsUseCase {

  constructor(private repo: ICardRepository) { }

  async execute(): Promise<Card[]> {
    return await this.repo.findAll();
  }
}

export { ListAllCardsUseCase };

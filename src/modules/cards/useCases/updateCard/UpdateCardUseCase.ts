import { Card } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
  type: string;
  published_at: Date | null;
  data: object;
}

class UpdateCardUseCase {

  constructor(private repo: ICardRepository) { }

  async execute({ id, name, description, type, published_at, data }: IRequest): Promise<Card> {

    const card = await this.repo.findById(id);
    if (!card) {
      throw new AppError("Card not found.", 404);
    }

    card.name = name;
    card.description = description;
    card.type = type;
    card.published_at = published_at;
    card.data = data;

    return await this.repo.update(card);
  }
}

export { UpdateCardUseCase };

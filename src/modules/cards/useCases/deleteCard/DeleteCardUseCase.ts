import { AppError } from "../../../../core/error/AppError";
import { ICardRepository } from "../../../../modules/cards/contracts/ICardRepository";

class DeleteCardUseCase {

  constructor(private repo: ICardRepository) { }

  async execute(id: string): Promise<void> {

    const card = await this.repo.findById(id);

    if (!card) {
      throw new AppError("Card not found.", 404);
    }

    await this.repo.delete(card);

    return;
  }
}

export { DeleteCardUseCase };

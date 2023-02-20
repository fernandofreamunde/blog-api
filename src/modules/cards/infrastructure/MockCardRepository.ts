import { Card } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { ICardRepository } from "../contracts/ICardRepository";
import { IDateProvider } from "../../../core/providers/date/IDateProvider";
import { ICardCreationDto } from "../contracts/ICardCreationDto";
import { DayjsDateProvider } from "../../../core/providers/date/DayJsProvider";

class MockCardRepository implements ICardRepository {

  cards: Card[];
  dateProvider: IDateProvider;

  constructor() {
    this.cards = [];
    this.dateProvider = new DayjsDateProvider();
  }

  async findPublic(): Promise<Card[]> {
    return this.cards.filter((card) => this.dateProvider.isInPast(card.published_at as Date));
  }

  async findAll(): Promise<Card[]> {
    return this.cards;
  }

  async findById(id: string): Promise<Card | null> {
    return this.cards.find((card) => card.id === id) ?? null;
  }

  async create(cardData: ICardCreationDto): Promise<Card> {
    const { name, description, type, blog, published_at, data } = cardData;
    const id = uuidV4();
    const created_at = new Date();
    const updated_at = new Date();
    const publishedAt = published_at ?? null;

    const card = {
      id,
      name,
      description,
      type,
      blog,
      data,
      published_at: publishedAt,
      created_at,
      updated_at,
    }

    await this.cards.push(card);

    return card;
  }

  async update(card: Card): Promise<Card> {
    const existingCard = await this.findById(card.id);
    const updated_at = new Date();

    if (!existingCard) {
      throw new Error("Card not found.");
    }

    const index = this.cards.indexOf(existingCard);

    this.cards[index] = { ...card, updated_at };

    return card;
  }

  async delete(card: Card): Promise<void> {
    const cardIndex = this.cards.indexOf(card);

    if (cardIndex === -1) {
      return;
    }

    this.cards.splice(cardIndex, 1);
  }
}

export { MockCardRepository }

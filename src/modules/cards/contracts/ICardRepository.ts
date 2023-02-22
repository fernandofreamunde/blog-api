import { Card } from "@prisma/client";
import { ICardCreationDto } from "./ICardCreationDto";

interface ICardRepository {
  findPublic(): Promise<Card[]>;
  findAll(): Promise<Card[]>;
  findById(id: string): Promise<Card | null>;
  create(card: ICardCreationDto): Promise<Card>;
  update(card: Card): Promise<Card>;
  delete(card: Card): Promise<void>;
}

export { ICardRepository };

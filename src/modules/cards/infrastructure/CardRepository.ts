import { Card, Prisma, PrismaClient } from "@prisma/client";
import { ICardRepository } from "../contracts/ICardRepository";
import { ICardCreationDto } from "../contracts/ICardCreationDto";

class CardRepository implements ICardRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findPublic(): Promise<Card[]> {

    return await this.prisma.card.findMany({
      where: {
        published_at: {
          lte: new Date(),
        }
      }
    });
  }

  async findAll(): Promise<Card[]> {
    return await this.prisma.card.findMany();
  }

  async findById(id: string): Promise<Card | null> {
    return await this.prisma.card.findUnique({
      where: {
        id
      }
    });
  }

  async create(cardData: ICardCreationDto): Promise<Card> {
    const { name, description, type, blog, published_at, data } = cardData;
    const updated_at = new Date();

    return await this.prisma.card.create({
      data: {
        name,
        description,
        type,
        data,
        blog,
        published_at,
        updated_at,
      },
    });
  }

  async update({ blog, data, description, id, name, published_at, type }: Card): Promise<Card> {
    const updated_at = new Date();
    const json = data as Prisma.JsonArray;

    return await this.prisma.card.update({
      data: {
        name,
        description,
        type,
        data: json,
        blog,
        published_at,
        updated_at,
      },
      where: {
        id: id
      }
    });
  }

  async delete(card: Card): Promise<void> {

    await this.prisma.card.delete({
      where: {
        id: card.id
      }
    });
  }
}

export { CardRepository };

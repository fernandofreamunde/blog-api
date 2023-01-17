import { PrismaClient, Token } from "@prisma/client";
import { ITokenInputDto } from "../contracts/ITokenInputDto";
import { ITokenRepository } from "../contracts/ITokenRepository";

class TokenRepository implements ITokenRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByToken(token: string): Promise<Token | null> {
    return await this.prisma.token.findUnique({
      where: {
        value: token
      }
    });
  }

  async findById(id: string): Promise<Token | null> {
    return await this.prisma.token.findUnique({
      where: {
        id
      }
    });
  }

  async create(data: ITokenInputDto): Promise<Token> {
    const {expired_at, type, user_id, value} = data;
    return await this.prisma.token.create({
      data: {
        user_id,
        type,
        value,
        expired_at,
      },
    });
  }
 
  async delete(id: string): Promise<void> {
    await this.prisma.token.delete({
      where: {
        id
      }
    });
  }
}

export { TokenRepository };

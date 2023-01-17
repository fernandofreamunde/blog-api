import { Token } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { ITokenInputDto } from "../contracts/ITokenInputDto";
import { ITokenRepository } from "../contracts/ITokenRepository";

class MockTokenRepository implements ITokenRepository{
  
  tokens: Token[];

  constructor() {
    this.tokens = [];
  }

  async findByToken(token: string): Promise<Token | null> {
    return this.tokens.find((tok) => tok.value === token) ?? null;
  }

  async findById(id: string): Promise<Token | null> {
    return this.tokens.find((token) => token.id === id) ?? null;
  }

  async delete(id: string): Promise<void> {
    const token = await this.findById(id);
    
    if (!token) {
      return;
    }
    
    const index = this.tokens.indexOf(token);
    this.tokens.splice(index, 1);
  }

  async create(data: ITokenInputDto): Promise<Token> {
    const { type, value, user_id, expired_at } = data;
    const id = uuidV4();
    const created_at = new Date();
    const updated_at = new Date();

    const token = {
      id,
      value,
      type,
      user_id,
      created_at,
      expired_at
    }

    await this.tokens.push(token);

    return token;
  }
}

export { MockTokenRepository };


import { Token } from "@prisma/client";
import { ITokenInputDto } from "./ITokenInputDto";
  
interface ITokenRepository {
  findByToken(token: string): Promise<Token | null>; 
  findById(id: string): Promise<Token | null>; 
  create(data: ITokenInputDto): Promise<Token>;
  delete(id: string): Promise<void>;
}

export { ITokenRepository };


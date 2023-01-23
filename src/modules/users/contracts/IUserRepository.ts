import { User } from "@prisma/client";
import { IUserInputDto } from "./IUserInputDto";

interface IUserRepository {
  // list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>; 
  findById(id: string): Promise<User | null>; 
  create(data: IUserInputDto): Promise<User>;
  update(user: User): Promise<User>;
}

export { IUserRepository };


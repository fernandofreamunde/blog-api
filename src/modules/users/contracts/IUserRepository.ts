import { User } from "@prisma/client";
import { IUserInputDto } from "./IUserInputDto";

interface IUserRepository {
  // list(): Promise<User[]>;
  findByEmail(email: string): Promise<User|undefined>; 
  // findById(id: string): Promise<User>; 
  create(data: IUserInputDto): Promise<User>;
  // update(user: User): Promise<User>;
}

export { IUserRepository };


import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { IUserInputDto } from "modules/users/contracts/IUserInputDto";
import { IUserRepository } from "modules/users/contracts/IUserRepository";

class CreateUserUseCase {

  constructor(
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, password, email }: IUserInputDto): Promise<User> {

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new Error("User already exist.");
    }

    // TODO make so 16 is an env var and change it to lower nr in tests
    const hashedPassword = await hash(password, 16);
    
    const user = await this.userRepository.create(
      {
        name,
        password: hashedPassword, 
        email
      }
    );

    return user;
  }
}

export { CreateUserUseCase };


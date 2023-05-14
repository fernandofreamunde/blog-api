import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { IUserInputDto } from "modules/users/contracts/IUserInputDto";
import { IUserRepository } from "modules/users/contracts/IUserRepository";
import auth from "../../../../core/config/auth";
import { AppError } from "../../../../core/error/AppError";
import { UserMap } from "../../../../modules/users/maps/UserMap";
import { IResponseUserDto } from "../../../../modules/users/dto/IResponseUserDto";

class CreateUserUseCase {

  constructor(
    private userRepository: IUserRepository,
  ) { }

  async execute({ name, password, email }: IUserInputDto): Promise<IResponseUserDto> {

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("User already exist.");
    }

    const hashedPassword = await hash(password, auth.entropy);

    const user = await this.userRepository.create(
      {
        name,
        password: hashedPassword,
        email
      }
    );

    return UserMap.toDto(user);
  }
}

export { CreateUserUseCase };


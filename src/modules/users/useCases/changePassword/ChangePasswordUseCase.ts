import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import auth from "../../../../core/config/auth";
import { AppError } from "../../../../core/error/AppError";
import { IUserRepository } from "../../../../modules/users/contracts/IUserRepository";

interface IRequest { 
  password: string;
  new_password: string; 
  user_id: string;
}

class ChangePasswordUseCase {

  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute({ password, new_password, user_id }: IRequest): Promise<void> {

    const user = await this.userRepository.findById(user_id) as User;
    
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Invalid password.");
    }

    const hashedPassword = await hash(password, auth.entropy);

    user.password = hashedPassword;

    this.userRepository.update(user);
    
    return;
  }
}

export { ChangePasswordUseCase };

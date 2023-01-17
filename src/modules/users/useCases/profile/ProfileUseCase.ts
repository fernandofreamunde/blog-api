import { User } from "@prisma/client";
import { IUserRepository } from "modules/users/contracts/IUserRepository";
import { AppError } from "../../../../core/error/AppError";

interface IRequest {
  user_id: string;
}

interface IResponse {
  user: User;
}

class ProfileUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {

    const user = await this.userRepository.findById(user_id);
    
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return { user };
  }
}

export { ProfileUseCase };

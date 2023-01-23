import { User } from "@prisma/client";
import { IUserRepository } from "modules/users/contracts/IUserRepository";
import { IUserUpdateDto } from "modules/users/contracts/IUserUpdateDto";
import { AppError } from "../../../../core/error/AppError";

class UpdateUserUseCase {

  constructor(
    private userRepository: IUserRepository,
  ) {}

  async execute({ current_user_id, id, email, name, bio }: IUserUpdateDto): Promise<User> {

    const currentUser = await this.userRepository.findById(current_user_id);
    const user = await this.userRepository.findById(id);
    const emailExist = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist.");
    }

    if (emailExist) {
      throw new AppError("Email already exist.");
    }

    if (currentUser?.id !== user.id && !currentUser?.is_admin) {
      throw new AppError("Unauthorized.", 403);
    }

    user.bio = bio;
    user.email = email;
    user.name = name;
    
    return await this.userRepository.update(user);
  }
}

export { UpdateUserUseCase };


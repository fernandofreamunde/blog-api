import { Request, Response } from "express";
import { UserRepository } from "../../../../modules/users/infrastructure/UserRepository";
import { ProfileUseCase } from "./ProfileUseCase";

class ProfileController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const user_id = request.session_user_id;

    // replace this with tsrynge container
    const repo = new UserRepository();
    const useCase = new ProfileUseCase(repo);
    const user = await useCase.execute({ user_id });

    return response.status(200).json(user);
  }
}

export { ProfileController };

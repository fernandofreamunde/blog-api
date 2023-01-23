import { Request, Response } from "express";
import { UserRepository } from "../../../../modules/users/infrastructure/UserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { email, name, bio } = request.body;
    const current_user_id = request.session_user_id;
    const { id } = request.params;

    // replace this with tsrynge container
    const repo = new UserRepository();
    const usecase = new UpdateUserUseCase(repo);
    const user = await usecase.execute({ current_user_id, id, email, name, bio });

    return response.status(200).json(user);
  }
}

export { UpdateUserController };


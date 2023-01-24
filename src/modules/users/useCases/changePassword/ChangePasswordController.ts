import { Request, Response } from "express";
import { UserRepository } from "../../../../modules/users/infrastructure/UserRepository";
import { ChangePasswordUseCase } from "./ChangePasswordUseCase";

class ChangePasswordController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const user_id = request.session_user_id;
    const { password, new_password } = request.body;

    // replace this with tsrynge container to get UseCase instance
    const repo = new UserRepository();
    const usecase = new ChangePasswordUseCase(repo);
    const user = await usecase.execute({ password, new_password, user_id });

    return response.status(200).json({message: 'template'});
  }
}

export { ChangePasswordController };

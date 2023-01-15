import { Request, Response } from "express";
import { UserRepository } from "../../../../modules/users/infrastructure/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { name, password, email } = request.body;

    // replace this with tsrynge container
    const repo = new UserRepository();
    const usecase = new CreateUserUseCase(repo);
    const user = await usecase.execute({ name, password, email });

    return response.status(201).json(user);
  }
}

export { CreateUserController };


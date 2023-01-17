import { Request, Response } from "express";
import { DayjsDateProvider } from "../../../../core/providers/date/DayJsProvider";
import { TokenRepository } from "../../../../modules/users/infrastructure/TokenRepository";
import { UserRepository } from "../../../../modules/users/infrastructure/UserRepository";
import { AuthenticationUseCase } from "./AuthenticationUseCase";

class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { password, email } = request.body;

    // replace this with tsrynge container
    const repo = new UserRepository();
    const tokenRepo = new TokenRepository();
    const dateProvider = new DayjsDateProvider();
    const useCase = new AuthenticationUseCase(repo, tokenRepo, dateProvider);
    const user = await useCase.execute({ password, email });

    return response.status(200).json(user);
  }
}

export { AuthenticationController };

import { AppError } from "../../../../core/error/AppError";
import { DayjsDateProvider } from "../../../../core/providers/date/DayJsProvider";
import makeUser from "../../../../modules/users/factory/UserFactory";
import { MockTokenRepository } from "../../../../modules/users/infrastructure/MockTokenRepository";
import { MockUserRepository } from "../../../../modules/users/infrastructure/MockUserRepository";
import { AuthenticationUseCase } from "./AuthenticationUseCase";

describe("Authenticate User", () => {
  it('should allow an existing user to login', async () => {

    const repo = new MockUserRepository();
    const tokenRepo = new MockTokenRepository();
    const dateProvider = new DayjsDateProvider();

    const user = await makeUser({repo, data: {email: 'john.doe@example.com'}});
    const useCase = new AuthenticationUseCase(repo, tokenRepo, dateProvider);

    const result = await useCase.execute({password: 'password', email: 'john.doe@example.com' });

    expect(tokenRepo.tokens.length).toEqual(1);
    expect(result.token).toBeDefined();
    expect(result.refresh_token).toBeDefined();
  });

  it('should not allow a user to login with non-existing email', async () => {
    
    const repo = new MockUserRepository();
    const tokenRepo = new MockTokenRepository();
    const dateProvider = new DayjsDateProvider();

    const useCase = new AuthenticationUseCase(repo, tokenRepo, dateProvider);

    // TODO: make this more specific.
    expect(async () => {
      const result = await useCase.execute({ password: 'password', email: 'john.doe@example.com' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow a user to login with wrong password', async () => {

    const repo = new MockUserRepository();
    const tokenRepo = new MockTokenRepository();
    const dateProvider = new DayjsDateProvider();

    const user = makeUser({repo, data: {email: 'john.doe@example.com'}});
    const useCase = new AuthenticationUseCase(repo, tokenRepo, dateProvider);

    // TODO: make this more specific.
    expect(async () => {
      const result = await useCase.execute({password: 'wrong_password', email: 'john.doe@example.com' });
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

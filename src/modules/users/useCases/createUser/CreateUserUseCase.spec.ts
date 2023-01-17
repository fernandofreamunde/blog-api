import { AppError } from "../../../../core/error/AppError";
import { MockUserRepository } from "../../../../modules/users/infrastructure/MockUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User UseCase", () => {
  it('should allow a user to create an account', async () => {
    
    const repo = new MockUserRepository();
    const useCase = new CreateUserUseCase(repo);

    const result = await useCase.execute({ name: 'John', password: 'password', email: 'john.doe@example.com' });

    expect(repo.users.length).toEqual(1);
    expect(result.name).toEqual('John');
    expect(result.password).not.toEqual('password');
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should not allow a user with duplicate email to create an account', async () => {
    
    const repo = new MockUserRepository();
    const useCase = new CreateUserUseCase(repo);

    await useCase.execute({ name: 'John', password: 'password', email: 'john.doe@example.com' });

    // TODO: make this more specific.
    expect(async () => {
      const result = await useCase.execute({ name: 'Johnny', password: 'password', email: 'john.doe@example.com' });
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

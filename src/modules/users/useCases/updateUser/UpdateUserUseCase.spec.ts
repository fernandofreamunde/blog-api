import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import makeUser from "../../../../modules/users/factory/UserFactory";
import { MockUserRepository } from "../../../../modules/users/infrastructure/MockUserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

describe("Update User UseCase", () => {
  it('should allow a user to update account info', async () => {
    
    const repo = new MockUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    const user = await makeUser({repo, data: {}}) as User;
    const bio = faker.lorem.sentences(2);

    const result = await useCase.execute({
      current_user_id: user.id, 
      id: user.id,
      email: 'john.doe@example.com', 
      name: 'John doe', 
      bio
    });

    expect(repo.users.length).toEqual(1);
    expect(result.name).toEqual('John doe');
    expect(result.bio).toEqual(bio);
  });

  it('should not allow a user to update email to existing email', async () => {
    
    const repo = new MockUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    const bio = faker.lorem.sentences(2);
    await makeUser({repo, data: { name: 'John', email: 'john.doe@example.com' }});
    const user = await makeUser({repo, data: {}}) as User;

    // TODO: make this more specific.
    expect(async () => {
      const result = await useCase.execute({
        current_user_id: user.id, 
        id: user.id,
        email: 'john.doe@example.com', 
        name: 'John doe', 
        bio
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow a user to update unexisting user', async () => {
    
    const repo = new MockUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    const bio = faker.lorem.sentences(2);
    const user = await makeUser({repo, data: {}}) as User;

    // TODO: make this more specific.
    expect(async () => {
      const result = await useCase.execute({
        current_user_id: user.id, 
        id: 'fake-user-uuid-1',
        email: 'john.doe@example.com', 
        name: 'John doe', 
        bio
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow a user to update another user', async () => {
    
    const repo = new MockUserRepository();
    const useCase = new UpdateUserUseCase(repo);

    const bio = faker.lorem.sentences(2);
    const otherUser = await makeUser({repo, data: { name: 'John', email: 'john.doe@example.com' }}) as User;
    const user = await makeUser({repo, data: {}}) as User;

    // TODO: make this more specific.
    expect(async () => {
      const result = await useCase.execute({
        current_user_id: user.id, 
        id: otherUser.id,
        email: 'john.doe@example.com', 
        name: 'John doe', 
        bio
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // given we do not have any admin yet this is ok 
  // Todo: whenever we add Admins then we must update this test
  
});

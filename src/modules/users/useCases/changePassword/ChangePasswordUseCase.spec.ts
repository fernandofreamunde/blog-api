import { User } from "@prisma/client";
import { AppError } from "../../../../core/error/AppError";
import makeUser from "../../../../modules/users/factory/UserFactory";
import { MockUserRepository } from "../../../../modules/users/infrastructure/MockUserRepository";
import { ChangePasswordUseCase } from "./ChangePasswordUseCase";

describe("Change Password test", () => {
  it('should allow a user to change their password while logged in', async () => {

    const repo = new MockUserRepository();
    const useCase = new ChangePasswordUseCase(repo);
    let user = await makeUser({repo, data: {}}) as User;
    const old_password_hash = user.password;
    const user_id = user.id;

    await useCase.execute({ password: 'password', new_password: 'newPassword', user_id });

    user = await repo.findById(user_id) as User;
    
    expect(old_password_hash).not.toEqual(user.password);
  });

  it('should not change the password if passes old pw', async () => {

    const repo = new MockUserRepository();
    const useCase = new ChangePasswordUseCase(repo);
    let user = await makeUser({repo, data: {}}) as User;
    const old_password_hash = user.password;
    const user_id = user.id;
    
    // TODO: make this more specific.
    expect(async () => {
      const result = await useCase.execute({ password: 'bad_password', new_password: 'newPassword', user_id });
    }).rejects.toBeInstanceOf(AppError);
  });
  
});

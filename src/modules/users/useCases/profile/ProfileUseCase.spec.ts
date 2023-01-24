import { User } from "@prisma/client";
import makeUser from "../../../../modules/users/factory/UserFactory";
import { MockUserRepository } from "../../infrastructure/MockUserRepository";
import { ProfileUseCase } from "./ProfileUseCase";

describe("User Profile UseCase", () => {
  it('should allow a user to see their own profile information', async () => {
    
    const repo = new MockUserRepository();
    const useCase = new ProfileUseCase(repo);

    const user = await makeUser({repo, data: {email: 'john.doe@example.com'}}) as User;

    const result = await useCase.execute({ user_id: user.id });

    expect(result.user.name).toEqual(user.name);
    expect(result.user.created_at).toEqual(user.created_at);
  });
});

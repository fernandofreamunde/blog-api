import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ITokenRepository } from "modules/users/contracts/ITokenRepository";
import { IUserRepository } from "modules/users/contracts/IUserRepository";
import auth from "../../../../core/config/auth";
import { AppError } from "../../../../core/error/AppError";
import { IDateProvider } from "../../../../core/providers/date/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

class AuthenticationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute({ password, email }: IRequest): Promise<IResponse> {

    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new AppError("Invalid email or password.");
    }
    
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Invalid email or password.");
    }

    const token = sign({ email: user.email, name: user.name }, auth.secret, {
      subject: user.id,
      expiresIn: auth.accessExpiresIn
    });

    const refreshToken = sign({email: user.email}, auth.refrehSecret, {
      subject: user.id,
      expiresIn: `${auth.refreshExpiresInDays}d`
    });

    await this.tokenRepository.create({
      expired_at: this.dateProvider.addDays(new Date(), auth.refreshExpiresInDays), 
      user_id: user.id,
      type: 'refresh_token',
      value: refreshToken
    });

    return {
      token,
      refresh_token: refreshToken,
    };
  }
}

export { AuthenticationUseCase };

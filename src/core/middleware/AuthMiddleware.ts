import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../../modules/users/infrastructure/UserRepository";
import auth from "../config/auth";
import { AppError } from "../error/AppError";

interface IPaload {
  email: string;
  name: string;
  iat: number;
  exp: number;
  sub: string;
}

export async function Auth(request: Request, response: Response, next: NextFunction): Promise<any> {

  const header = request.headers.authorization;
  
  if (!header) {
    throw new AppError("Unauthorized", 401);
  }

  const [,token] = header.split(' ');
  
  
  try {
    const { sub: userId } = verify(token, auth.secret);

    if (!userId) {
      throw new AppError("Invalid token.", 401);
    }

    const userRepository = new UserRepository();
  
    const user = await userRepository.findById(userId.toString());
    
    if (!user) {
      throw new AppError("Invalid token.", 401);
    }

    request.session_user_id = user.id;
    
  } catch (error) {
    throw new AppError("Invalid token.", 401);
  }

  return next();
}
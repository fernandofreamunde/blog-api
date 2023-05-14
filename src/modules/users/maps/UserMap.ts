import { instanceToInstance } from "class-transformer";
import { IResponseUserDto } from "../dto/IResponseUserDto";
import { User } from "@prisma/client";


class UserMap {
  static toDto({
    id,
    name,
    email,
    bio,
    status,
    created_at,
    updated_at
  }: User): IResponseUserDto {

    const user = instanceToInstance({
      id,
      name,
      email,
      bio,
      status,
      created_at,
      updated_at,
    });

    return user;
  }
}

export { UserMap }
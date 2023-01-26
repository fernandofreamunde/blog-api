import { Blog } from "@prisma/client";
import { IBlogCreationDto } from "./IBlogCreationDto";

interface IBlogRepository {
  findById(id: string): Promise<Blog | null>; 
  findByOwnerId(owner: string): Promise<Blog | null>; 
  create(data: IBlogCreationDto): Promise<Blog>;
  update(user: Blog): Promise<Blog>;
}

export { IBlogRepository };

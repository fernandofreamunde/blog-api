import { Request, Response } from "express";
import { TemplateUseCase } from "./TemplateUseCase";

class TemplateController {
  async handle(request: Request, response: Response): Promise<Response<any, Record<string, any>>> {

    // replace this with tsrynge container to get UseCase instance
    const usecase = new TemplateUseCase();
    const user = await usecase.execute();

    return response.status(200).json({message: 'template'});
  }
}

export { TemplateController };

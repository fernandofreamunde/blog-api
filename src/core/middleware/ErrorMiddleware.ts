
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";

export async function ErrorMiddleware(err: Error, _request: Request, response: Response, next: NextFunction) {

  
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({message: err.message});
  }

  return response.status(500).json({
    starus: 'error',
    message: `Internal Server Error: ${err.message}`
  });
}

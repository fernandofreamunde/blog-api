import 'dotenv/config';
import express, { Router } from "express";
import 'express-async-errors';
import { ErrorMiddleware } from './core/middleware/ErrorMiddleware';
import { blogRouter } from './modules/blogs/infrastructure/BlogRouter';
import { userRouter } from './modules/users/infrastructure/UserRouter';

const app = express();

app.use(express.json());

const router = Router();

router.use(userRouter);
router.use(blogRouter);

app.use(router);

app.get('/', (request, response) => {
  
  return response.status(200).json({message: 'hello World'});
});

app.use(ErrorMiddleware);

export { app };

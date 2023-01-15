import 'dotenv/config';
import express, { Router } from "express";
import { userRouter } from './modules/users/infrastructure/UserRouter';

const app = express();

app.use(express.json());

const router = Router();

router.use(userRouter);

app.use(router);

app.get('/', (request, response) => {
  
  return response.status(200).json({message: 'hello World'});
});

export { app };

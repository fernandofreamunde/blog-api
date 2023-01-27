import { Router } from "express";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { CreateBlogController } from "../useCases/createBlog/CreateBlogController";

const blogRouter = Router();

const createBlogController = new CreateBlogController();

blogRouter.post('/blogs', Auth, createBlogController.handle);

export { blogRouter };


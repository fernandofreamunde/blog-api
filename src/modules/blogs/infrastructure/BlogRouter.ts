import { Router } from "express";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { CreateBlogController } from "../useCases/createBlog/CreateBlogController";
import { UpdateBlogController } from "../useCases/updateBlog/UpdateBlogController";

const blogRouter = Router();

const createBlogController = new CreateBlogController();
const updateBlogController = new UpdateBlogController();

blogRouter.post('/blogs', Auth, createBlogController.handle);
blogRouter.patch('/blogs/:id', Auth, updateBlogController.handle);

export { blogRouter };


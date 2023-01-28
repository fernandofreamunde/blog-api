import { Router } from "express";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { CreateBlogController } from "../useCases/createBlog/CreateBlogController";
import { ReadBlogController } from "../useCases/readBlog/ReadBlogController";
import { UpdateBlogController } from "../useCases/updateBlog/UpdateBlogController";

const blogRouter = Router();

const createBlogController = new CreateBlogController();
const updateBlogController = new UpdateBlogController();
const readBlogController = new ReadBlogController();

blogRouter.post('/blogs', Auth, createBlogController.handle);
blogRouter.patch('/blogs/:id', Auth, updateBlogController.handle);
blogRouter.get('/blogs/:id', readBlogController.handle);

export { blogRouter };


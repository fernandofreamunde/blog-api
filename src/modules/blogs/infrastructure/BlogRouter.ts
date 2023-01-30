import { Router } from "express";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { CreateArticleController } from "../useCases/createArticle/CreateArticleController";
import { CreateBlogController } from "../useCases/createBlog/CreateBlogController";
import { ReadBlogController } from "../useCases/readBlog/ReadBlogController";
import { UpdateBlogController } from "../useCases/updateBlog/UpdateBlogController";

const blogRouter = Router();

const createBlogController = new CreateBlogController();
const updateBlogController = new UpdateBlogController();
const readBlogController = new ReadBlogController();

const createArticleController = new CreateArticleController();

blogRouter.post('/blogs', Auth, createBlogController.handle);
blogRouter.patch('/blogs/:id', Auth, updateBlogController.handle);
blogRouter.get('/blogs/:id', readBlogController.handle);

blogRouter.post('/articles', Auth, createArticleController.handle);

export { blogRouter };


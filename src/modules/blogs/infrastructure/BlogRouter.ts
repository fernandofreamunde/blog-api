import { Router } from "express";
import { Auth } from "../../../core/middleware/AuthMiddleware";
import { CreateArticleController } from "../useCases/createArticle/CreateArticleController";
import { CreateBlogController } from "../useCases/createBlog/CreateBlogController";
import { ReadBlogController } from "../useCases/readBlog/ReadBlogController";
import { UpdateArticleController } from "../useCases/updateArticle/UpdateArticleController";
import { UpdateBlogController } from "../useCases/updateBlog/UpdateBlogController";
import { DeleteArticleController } from "../useCases/deleteArticle/DeleteArticleController";
import { ReadArticleController } from "../useCases/readArticle/ReadArticleController";
import { ListPublicArticlesController } from "../useCases/listPublicArticles/ListPublicArticlesController";
import { ListAllArticlesController } from "../useCases/listAllArticles/ListAllArticlesController";

const blogRouter = Router();

const createBlogController = new CreateBlogController();
const updateBlogController = new UpdateBlogController();
const readBlogController = new ReadBlogController();

const createArticleController = new CreateArticleController();
const updateArticleController = new UpdateArticleController();
const deleteArticleController = new DeleteArticleController();
const readArticleController = new ReadArticleController();
const listPublicArticles = new ListPublicArticlesController();
const listAllArticles = new ListAllArticlesController();

blogRouter.post('/blogs', Auth, createBlogController.handle);
blogRouter.patch('/blogs/:id', Auth, updateBlogController.handle);
blogRouter.get('/blogs/:id', readBlogController.handle);

blogRouter.post('/articles', Auth, createArticleController.handle);
blogRouter.patch('/articles/:id', Auth, updateArticleController.handle);
blogRouter.delete('/articles/:id', Auth, deleteArticleController.handle);
blogRouter.get('/articles/:id', readArticleController.handle);
blogRouter.get('/articles', listPublicArticles.handle);
blogRouter.get('/admin/articles', Auth, listAllArticles.handle);

export { blogRouter };

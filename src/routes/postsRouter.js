import { Router } from "express";

import postSchema from "./../schemas/postSchema.js";
import repostSchema from "./../schemas/repostSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import { validateToken } from "./../middlewares/authValidator.js";
import {createPost, deletePost, getAllPosts, updatePost, createRepost} from "./../controllers/postControllers.js";
import { getPostsByUser } from "../controllers/userController.js";

const urlsRouter = Router();

urlsRouter.post("/posts", validateToken, validateSchema(postSchema), createPost);
urlsRouter.get('/posts', validateToken, getAllPosts);
urlsRouter.delete('/posts', validateToken, deletePost);
urlsRouter.get('/user/:id', validateToken, getPostsByUser);
urlsRouter.put('/edit-post', validateToken, updatePost);
urlsRouter.post("/repost", validateToken, validateSchema(repostSchema), createRepost);

export default urlsRouter;
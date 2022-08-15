import { Router } from "express";

import postSchema from "./../schemas/postSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import { validateToken } from "./../middlewares/authValidator.js";
import {createPost, deletePost, getAllPosts} from "./../controllers/postControllers.js";

const urlsRouter = Router();

urlsRouter.post("/posts", validateToken, validateSchema(postSchema), createPost);
urlsRouter.get('/posts', validateToken, getAllPosts);
urlsRouter.delete('/posts', deletePost);

export default urlsRouter;
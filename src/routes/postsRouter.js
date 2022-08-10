import { Router } from "express";

import postSchema from "./../schemas/postSchema.js";
import { validateSchema } from "./../middlewares/schemaValidator.js";
import { validateToken } from "./../middlewares/authValidator.js";
import {createPost, getAllPosts} from "./../controllers/postControllers.js";

const urlsRouter = Router();

urlsRouter.post("/posts", validateSchema(postSchema), createPost);
urlsRouter.get('/posts', getAllPosts);

export default urlsRouter;
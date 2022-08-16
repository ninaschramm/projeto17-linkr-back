import { Router } from "express";

import hashtagRouter from "./hashtagRouter.js";
import likeRouter from "./likeRouter.js";
import postRouters from "./postsRouter.js";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();


router.use(postRouters, hashtagRouter, authRouter, likeRouter, usersRouter);

export default router; 
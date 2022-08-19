import { Router } from "express";

import hashtagRouter from "./hashtagRouter.js";
import likeRouter from "./likeRouter.js";
import postRouters from "./postsRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import usersRouter from "./usersRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();


router.use(postRouters, hashtagRouter, authRouter, likeRouter, userRouter, usersRouter, commentsRouter);

export default router; 
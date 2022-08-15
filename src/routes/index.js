import { Router } from "express";

import hashtagRouter from "./hashtagRouter.js";
import likeRouter from "./likeRouter.js";
import postRouters from "./postsRouter.js";
import authRouter from "./authRouter.js";

const router = Router();


router.use(postRouters, hashtagRouter, authRouter, likeRouter);

export default router; 
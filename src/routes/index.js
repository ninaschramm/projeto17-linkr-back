import { Router } from "express";
import hashtagRouter from "./hashtagRouter.js";
import likeRouter from "./likeRouter.js";
import postRouters from "./postsRouter.js";

const router = Router();

router.use(postRouters, hashtagRouter, likeRouter);

export default router; 
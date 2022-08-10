import { Router } from "express";
import hashtagRouter from "./hashtagRouter.js";
import postRouters from "./postsRouter.js";

const router = Router();

router.use(postRouters, hashtagRouter);

export default router; 
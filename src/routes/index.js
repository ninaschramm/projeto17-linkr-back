import { Router } from "express";
import postRouters from "./postsRouter.js";

const router = Router();

router.use(postRouters);

export default router; 
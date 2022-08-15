import { Router } from "express";
import { validateToken } from "../middlewares/authValidator.js";
import { getLike, postLike, deleteLike } from "../controllers/likeControllers.js";

const likeRouter = Router();

likeRouter.post("/like/:id", postLike);
likeRouter.get("/like/:id", getLike);
likeRouter.delete("/like/:id", deleteLike);

export default likeRouter;
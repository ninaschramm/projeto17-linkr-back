import { Router } from "express";
import { checkFollows, followRequest, unfollow } from "../controllers/userController.js";
import { validateToken } from "../middlewares/authValidator.js";

const userRouter = Router();

userRouter.post("/users/:id", validateToken, followRequest);
userRouter.get("/users/:id", validateToken, checkFollows);
userRouter.delete("/users/:id", validateToken, unfollow);

export default userRouter;
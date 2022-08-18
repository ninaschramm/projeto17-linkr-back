import { Router } from "express";

import { validateToken } from "../middlewares/authValidator.js";
import { searchUsers } from "../controllers/userController.js";

const usersRouter = Router();

usersRouter.get('/serachUsers/:letters', validateToken, searchUsers);

export default usersRouter;
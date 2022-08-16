import { Router } from "express";

import searchSchema from "../schemas/searchSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/authValidator.js";
import { searchUsers } from "../controllers/userController.js";

const usersRouter = Router();

usersRouter.get('/serachUsers', validateToken, validateSchema(searchSchema), searchUsers);

export default usersRouter;
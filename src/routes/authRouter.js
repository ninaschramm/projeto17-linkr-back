import { Router } from "express";

import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";

import { createUser } from "../controllers/userController.js";
//import { singIn } from "../controllers/authController.js";

import { validateSchema } from "../middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), createUser);
authRouter.post("/signin", validateSchema(signInSchema), /*signIn*/);

export default authRouter;
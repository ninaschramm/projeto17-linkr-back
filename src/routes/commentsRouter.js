import { Router} from "express";
import { countComments, getComments, postComment } from "../controllers/commentControllers.js";
import { validateToken } from '../middlewares/authValidator.js';

const commentsRouter = Router();

commentsRouter.get('/comments/:id', getComments)
commentsRouter.post('/comments/:id', validateToken, postComment)
commentsRouter.get('/count/:id', countComments)


export default commentsRouter

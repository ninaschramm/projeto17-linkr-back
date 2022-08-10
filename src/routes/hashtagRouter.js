import { Router} from "express";
import { getTrendingHashtags } from "../controllers/hashtagControllers.js";
import { validateToken } from '../middlewares/authValidator.js';

const hashtagRouter = Router();

hashtagRouter.get('/hashtags', getTrendingHashtags) //incluir o validateToken depois

export default hashtagRouter

import { Router} from "express";
import { getPostsByHashtag, getTrendingHashtags } from "../controllers/hashtagControllers.js";
import { validateToken } from '../middlewares/authValidator.js';

const hashtagRouter = Router();

hashtagRouter.get('/hashtags', getTrendingHashtags) //incluir o validateToken depois
hashtagRouter.get('/hashtags/:hashtag', getPostsByHashtag)

export default hashtagRouter

import joi from 'joi';


const repost = joi.object({
  postId: joi.number().required()
});

export default repost;
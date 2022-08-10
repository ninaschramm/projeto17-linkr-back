import joi from 'joi';

const post = joi.object({
  link: joi.string().required(),
  text: joi.string().required()
});

export default post;
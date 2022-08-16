import joi from 'joi';


const post = joi.object({
  letters: joi.string().min(3).required(),
});

export default post;
const Joi = require("joi");

const createValidation = Joi.object({
  no: Joi.string().required(),
  totalPrice: Joi.number().required(),
  status: Joi.string(),
  user: Joi.string().required(),
  products: Joi.array().items(Joi.string().required()),
  isCanceled: Joi.boolean(),
});

module.exports = {
  createValidation,
};

const Joi = require("joi");

const createValidation = Joi.object({
  productName: Joi.string().required().min(2),
  productPrice: Joi.number().required(),
  productQuantity: Joi.number().required(),
  productDescription: Joi.string().required().min(5).max(500),
  category: Joi.array().items(Joi.string().required()),
});

module.exports = {
  createValidation,
};

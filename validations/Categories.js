const Joi = require("joi");

const createValidation = Joi.object({
  categoryName: Joi.string().required().min(2),
  categoryDescription: Joi.string().required().min(10).max(20),
});

module.exports = {
  createValidation,
};

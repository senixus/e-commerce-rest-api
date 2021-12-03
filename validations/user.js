const Joi = require("joi");

const createValidation = Joi.object({
  firstName: Joi.string().required().min(3),
  lastName: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(32),
});

module.exports = {
  createValidation,
};

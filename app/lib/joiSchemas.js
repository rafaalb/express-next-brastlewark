const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required(),
});

const Schema = {
  loginSchema,
};

module.exports = Schema;

const joi = require("joi");

let registerSchema = joi.object({
  username: joi.string().required(),
  email: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z]{3,10}(@)(gmail|yahoo)(.com)$/),
  password: joi.string().required(),
  role: joi.string().valid("user", "admin").default("user"),
});

module.exports = registerSchema;

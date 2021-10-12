const Joi = require('joi');

const {EMAIL_REGEXP} = require("../configs/regExp");

module.exports = {
    authValidator: Joi.object({
        email: Joi
            .string()
            .regex(EMAIL_REGEXP)
            .required()
            .lowercase()
            .trim(),
        password: Joi
            .string()
            // .regex(PASSWORD_REGEXP)
            .required()
    })
};

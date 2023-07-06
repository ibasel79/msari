const Joi = require("joi");

const addAdminSchema = Joi.object({
    firstname: Joi.string().max(20).required(),
    lastname: Joi.string().max(20).required(),
    password: Joi.string().alphanum().min(7).required(),
    username: Joi.string().min(7).required(),
});

const updateAdminSchema = Joi.object({
    firstname: Joi.string().max(20).required(),
    lastname: Joi.string().max(20).required(),
    username: Joi.string().min(7).required(),
});

module.exports = {
    addAdminSchema,
    updateAdminSchema,
};

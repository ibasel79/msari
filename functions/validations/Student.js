const Joi = require("joi");

const addStudentSchema = Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string().max(20).required(),
    lastname: Joi.string().max(20).required(),
    password: Joi.string().alphanum().min(7).required(),
    username: Joi.string().min(7).required(),
    gpa: Joi.number().required(),
});

const updateStudentSchema = Joi.object({
    firstname: Joi.string().max(20).required(),
    lastname: Joi.string().max(20).required(),
    username: Joi.string().min(7).required(),
    gpa: Joi.number().required(),
});

module.exports = {
    addStudentSchema,
    updateStudentSchema,
};

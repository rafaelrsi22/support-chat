const joi = require('joi');

const userSchema = joi.object({
    username: joi.string().min(6).max(16).required(),
    password: joi.string().min(8).max(32).required(),
    email: joi.string().min(8).max(256).required()
});

module.exports = userSchema;
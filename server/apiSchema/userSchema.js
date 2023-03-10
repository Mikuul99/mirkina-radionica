const Joi = require('@hapi/joi');
const { checkObjectId } = require('../helper/dbHelper');

module.exports.userRegister = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(), 
});

module.exports.userLogin = Joi.object().keys({
    email: Joi.string(),
    username: Joi.string(),
    password: Joi.string().required(), 
});
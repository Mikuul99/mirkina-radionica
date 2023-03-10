const Joi = require('@hapi/joi');

module.exports.createProductSchema = Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string(),
});

module.exports.getAllProductSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateProductSchema = Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string()
})
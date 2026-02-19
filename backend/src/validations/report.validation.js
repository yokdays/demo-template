const Joi = require('joi');

exports.summaryQuery = Joi.object({
  year: Joi.number().integer().min(2000).required(),
  gender: Joi.string().valid('male', 'female').required()
});
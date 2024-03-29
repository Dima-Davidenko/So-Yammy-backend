const HttpError = require('./HttpError');
const Joi = require('joi');

const getRegexForSearchByTitleAndIngredient = query => {
  const querySchema = Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.base': `"search query" should be a type of 'string'`,
      'string.pattern.base': `wrong format of "search query"`,
      'any.required': `"search query" is required`,
    });
  const { error } = querySchema.validate(query);
  if (error) {
    throw HttpError(400, error.message);
  }
  const regex = new RegExp(query.toLowerCase(), 'i');
  return regex;
};

module.exports = getRegexForSearchByTitleAndIngredient;

const Joi = require('@hapi/joi');

/**
 * Joi: Esse pacote é usado para validar e
 * retornar erros de validação de forma automatizada.
 *  Ele facilita muito o desenvolvimento e garante
 * um sistema fechado contra usuários mal intencionados,
 * seu uso é muito comum no desenvolvimento com Hapi,
 * assim ele tem um grande suporte pela comunidade.
 */

// Criando um schema com os mesmo nomes dos inputs do formulário.
// Efetua as devidas validações para cada input.
const schema = Joi.object({
  email: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i))
    .messages({
      'string.pattern.base': 'O email deve ter o formato email@mail.com',
      'string.base': 'O email deve ter o formato email@mail.com',
      'string.empty': 'O email deve ter o formato email@mail.com',
      'string.min': 'O email deve ter o formato email@mail.com',
      'any.required': 'O email deve ter o formato email@mail.com',
    }),
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .pattern(new RegExp('^[a-zA-Z]{3}[a-zA-Z0-9]*$'))
    .required()
    .messages({
      'string.pattern.base': 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'string.base': 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'string.empty': 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'string.min': 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'any.required': 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    }),
  lastName: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .pattern(new RegExp('^[a-zA-Z]{3}[a-zA-Z0-9]*$'))
    .required()
    .messages({
      'string.pattern.base': 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'string.base': 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'string.empty': 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'string.min': 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      'any.required': 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    }),
  passWord: Joi.string()
    .min(6)
    .max(18)
    .required()
    .messages({
    'string.base': 'A senha deve ter pelo menos 6 caracteres',
    'string.empty': 'A senha deve ter pelo menos 6 caracteres',
    'string.min': 'A senha deve ter pelo menos 6 caracteres',
    'any.required': 'A senha deve ter pelo menos 6 caracteres',
  }),

  confirmPassWord: Joi.string()
    .required()
    .valid(Joi.ref('passWord'))
    .error(new Error('As senhas tem que ser iguais')),
});

module.exports = schema;

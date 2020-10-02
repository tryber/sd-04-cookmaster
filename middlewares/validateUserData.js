/**
 * Validation middleware made based on express-validator module documentation and
 * this dev.top article https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
 */
const { body, validationResult } = require('express-validator');

const userDataValidationRules = () => [
  /** User email must be valid */
  body('email', 'O email deve ter o formato email@mail.com').exists().isEmail().normalizeEmail(),
  /** User password must be at last 6 characters long */
  body('password', 'A senha deve ter pelo menos 6 caracteres').exists().isLength({ min: 6 }),
  /** user first name must be at least 3 characters long */
  body('firstName', 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras')
    .exists()
    .isLength({ min: 3 })
    .isAlpha(),
  /** user first name must be at least 3 characters long */
  body('lastName', 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras')
    .exists()
    .isLength({ min: 3 })
    .isAlpha(),
];

/** Do user data validation using given data validation rules on the route */
const validateUserData = (req, res, next) => {
  const errors = validationResult(req);

  if (errors) return next();

  const normalizedErrors = errors.array().map((error) => ({ [error.param]: error.msg }));

  return res.render('signup', { normalizedErrors });
};

module.exports = {
  userDataValidationRules,
  validateUserData,
};

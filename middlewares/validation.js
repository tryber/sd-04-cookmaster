const validator = require('validator');

const validation = (req, res, next) => {
  const {
    email, password, confirm, name, lastname,
  } = req.body;

  const error = {
    email: false, password: false, confirm: false, name: false, lastname: false,
  };

  error.email = !validator.isEmail(email);
  error.password = !validator.isLength(password, { min: 6 });
  error.confirm = password !== confirm;
  error.name = !validator.isLength(name, { min: 3 }) || !validator.isAlpha(name);
  error.lastname = !validator.isLength(lastname, { min: 3 }) || !validator.isAlpha(lastname);

  req.validation = error;

  return next();
};

module.exports = validation;

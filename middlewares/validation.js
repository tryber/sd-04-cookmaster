const validator = require('validator');

const validation = (req, res, next) => {
  const {
    email, password, confirm, name, lastname,
  } = req.body;

  if (!validator.isEmail(email)) res.render('users/register', { error: 'email', success: false });

  if (!validator.isLength(password, { min: 6 })) res.render('users/register', { error: 'password', success: false });

  if (password !== confirm) res.render('users/register', { error: 'confirm', success: false });

  if (!validator.isLength(name, { min: 3 }) || !validator.isAlpha(name)) {
    return res.render('users/register', { error: 'name', success: false });
  }

  if (!validator.isLength(lastname, { min: 3 }) || !validator.isAlpha(lastname)) {
    return res.render('users/register', { error: 'lastname', success: false });
  }

  return next();
};

module.exports = validation;

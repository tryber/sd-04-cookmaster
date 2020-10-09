const { createUser, isValid } = require('../models/signUpModel');

const signUpForm = (_req, res) => {
  res.render('signup', { message: null });
};

const signUpController = async (req, res) => {
  const { email, password, confirmPassword, name, lname } = req.body;
  const userValidation = isValid(email, password, confirmPassword, name, lname);
  if (userValidation.message === 'Cadastro efetuado com sucesso!') {
    await createUser(email, password, name, lname);
    res.render('admin/login', { message: userValidation.message, redirect: null });
  } else res.render('signup', userValidation);
};

module.exports = {
  signUpForm,
  signUpController,
};

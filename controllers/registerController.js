const { registerUser } = require('../models/registerModel');

const registerForm = async (_, res) => {
  res.render('register', { message: null });
};

const validation = (email, firstName, lastName) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const nameRegex = /^[a-zA-Z]{3,}/;
  let message = '';

  if (!emailRegex.test(email)) message = 'O email deve ter o formato email@mail.com';

  if (!nameRegex.test(firstName)) message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';

  if (!nameRegex.test(lastName)) message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';

  return message;
};

const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log(email, password, confirmPassword, firstName, lastName);
  const regexVerification = validation(email, firstName, lastName);
  console.log('Regex Result:',regexVerification);

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.render('register', { message: 'Você deve preencher todos os campos' });
  }

  if (password.length < 6) {
    return res.render('register', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  if (password !== confirmPassword) {
    return res.render('register', { message: 'As senhas tem que ser iguais' });
  }

  if (!regexVerification === '') {
    res.render('register', { message: 'Some error' });
  }

  await registerUser(email, password, firstName, lastName);
  res.render('register', { message: 'Usuário cadastrado com sucesso!' });
};

module.exports = {
  registerForm,
  register,
};

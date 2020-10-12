const registerUserModel = require('../models/registerUserModel');

const getCadastro = (_req, res) => {
  res.render('signup', { message: null });
};

const passwordValidation = (password, verifyPassword) => {
  let message = '';

  if (password !== verifyPassword) message = 'As senhas tem que ser iguais';

  if (password.length < 6) message = 'A senha deve ter pelo menos 6 caracteres';

  return message;
};

const regexValidations = (email, name, lastName) => {
  let message = '';
  const regexName = /^[a-z]{3,}$/i;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) message = 'O email deve ter o formato email@mail.com';

  if (!regexName.test(name)) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  if (!regexName.test(lastName)) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  return message;
};

const registerUser = async (req, res) => {
  const { email, password, verifyPassword, name, lastName } = req.body;

  if (!email || !password || !verifyPassword || !name || !lastName) {
    return res.render('signup', { message: 'Preeencha todos os campos' });
  }

  const regexMessage = regexValidations(email, name, lastName);
  const passwordMessage = passwordValidation(password, verifyPassword);

  if (passwordMessage || regexMessage) {
    return res.render('signup', { message: passwordMessage || regexMessage });
  }

  const warningCount = await registerUserModel(email, password, name, lastName);
  if (warningCount > 0) {
    return res.render('signup', { message: 'erro ao inserir usuario no banco de dados' });
  }

  return res.render('admin/login', {
    message: 'Cadastro efetuado com sucesso!',
    redirect: null,
  });
};

module.exports = { getCadastro, registerUser };

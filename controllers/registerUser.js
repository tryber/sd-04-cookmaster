const { insertUserModel } = require('../models/inserUserModel');

const passwordValidation = (password, verifyPassword) => {
  let message = '';
  if (password !== verifyPassword) message = 'As senhas tem que ser iguais';

  if (password.length < 6) message = 'A senha deve ter pelo menos 6 caracteres';

  return message;
};

const regexValidations = (email, name, lastName) => {
  let message = '';
  const regexNumber = /[0-9]/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) message = 'O email deve ter o formato email@mail.com';
  if (name.length < 3 || regexNumber.test(name)) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  if (lastName.length < 3 || regexNumber.test(lastName)) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  return message;
};

const createUser = async (req, res) => {
  const { email, password, verifyPassword, name, lastName } = req.body;

  if (!email || !password || !verifyPassword || !name || !lastName) {
    return res.render('cadastro', { message: 'Preeencha todos os campos' });
  }

  const regexMessage = regexValidations(email, name, lastName);
  const passwordMessage = passwordValidation(password, verifyPassword);

  if (passwordMessage || regexMessage) {
    return res.render('cadastro', { message: passwordMessage || regexMessage });
  }

  const warningCount = await insertUserModel(email, password, name, lastName);
  if (warningCount > 0) {
    return res.render('cadastro', { message: 'erro ao inserir usuario no banco de dados' });
  }

  return res.render('admin/login', {
    message: 'Cadastro efetuado com sucesso!',
    redirect: null,
  });
};

module.exports = createUser;

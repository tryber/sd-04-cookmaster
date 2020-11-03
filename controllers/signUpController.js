const UserModel = require('../models/userModel');

const passwordValidation = (password, verifyPassword) => {
  let message = '';
  if (password.length < 6) message = 'A senha deve ter pelo menos 6 caracteres';
  if (password !== verifyPassword) message = 'As senhas tem que ser iguais';

  return message;
};

const regexValidation = (email, name, lastname) => {
  let message = '';
  // Espressão regex consultada externamente (https://regex101.com/library/SOgUIV)
  const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const regexNumber = /[0-9]/;

  if (!regexEmail.test(email)) message = 'O email deve ter o formato email@mail.com';

  if (lastname.length < 3 || regexNumber.test(lastname)) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  if (regexNumber.test(name) || name.length < 3) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  return message;
};

const registerUser = async (req, res) => {
  try {
    const {
      email, password, verifyPassword, name, lastName,
    } = req.body;

    if (!email || !password || !verifyPassword || !name || !lastName) {
      return res.render('cadastro', { message: 'Preeencha todos os campos' });
    }

    const regexMessage = regexValidation(email, name, lastName);
    const passwordMessage = passwordValidation(password, verifyPassword);

    if (regexMessage || passwordMessage) {
      return res.render('cadastro', { message: passwordMessage || regexMessage });
    }
    await UserModel.signUpUserModel(email, password, name, lastName);

    return res.render('admin/login', {
      message: 'Cadastro efetuado com sucesso!',
      redirect: null,
    });
  } catch (_error) {
    return res.render('cadastro', { message: 'erro ao inserir usuario no banco de dados' });
  }
};
module.exports = registerUser;

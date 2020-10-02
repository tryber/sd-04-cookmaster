const userModel = require('../models/userModel');

const signup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  const regexName = /^[a-z]+$/i;

  if (!regexEmail.test(email))
    return res.render('signup', { message: 'O email deve ter o formato email@mail.com' });

  if (password[0].length < 6)
    return res.render('signup', { message: 'A senha deve ter pelo menos 6 caracteres' });

  if (password[0] !== password[1])
    return res.render('signup', { message: 'As senhas tem que ser iguais' });

  if (!regexName.test(firstName) || firstName.length < 3)
    return res.render('signup', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  if (!regexName.test(lastName) || lastName.length < 3)
    return res.render('signup', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  await userModel.newUser(email, password, firstName, lastName);
  res.render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = { signup };

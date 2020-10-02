const newUser = require('../models/userModel');

const cadastroForm = (req, res) => {
  res.render('cadastro', { message: null, redirect: null });
};

const signup = async (req, res) => {
  const { email, password, passconfirm, name, lastName } = req.body;
  if (!email.includes('@') || !email.includes('.')) {
    return res.render('cadastro', {
      message: 'O email deve ter o formato email@mail.com',
      redirect: null,
    });
  }
  if (password.length < 6) {
    return res.render('cadastro', {
      message: 'A senha deve ter pelo menos 6 caracteres',
      redirect: null,
    });
  }
  if (password != passconfirm) {
    return res.render('cadastro', {
      message: 'As senhas tem que ser iguais',
      redirect: null,
    });
  }
  if (typeof name != 'string' || name.length <= 3) {
    return res.render('cadastro', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      redirect: null,
    });
  }
  if (typeof lastName != 'string' || lastName.length <= 3) {
    return res.render('cadastro', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      redirect: null,
    });
  }
  await newUser.createUser(email, password, name, lastName);
  res.render('cadastro', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  signup,
  cadastroForm,
};

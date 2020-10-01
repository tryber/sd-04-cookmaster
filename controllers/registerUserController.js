const userModel = require('../models/userModel');
const registerUserModel = require('../models/registerUserModel');

const registerForm = (_req, res) =>
  res.render('register', { message: null });

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const numberInStringRegex = /[0-9]/;

const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.render('register', { message: "Preencha todos os campos" });
  }
  const testRegex = emailRegex.test(email);

  if (!testRegex) {
    return res.render('register', { message: "O email deve ter o formato email@mail.com" });
  }
  const user = await userModel.findByEmail(email);
  if (user) {
    return res.render('register', { message: "Esse email já está cadastrado" });
  }
  if (password.length < 6) {
    return res.render('register', { message: "A senha deve ter pelo menos 6 caracteres" });
  }

  if (password !== confirmPassword) {
    return res.render('register', { message: "As senhas tem que ser iguais" });
  }

  if (numberInStringRegex.test(firstName) || firstName.length < 3) {
    return res.render('register', {
      message: "O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras"
    });
  }
  if (numberInStringRegex.test(lastName) || lastName.length < 3) {
    return res.render('register', {
      message: "O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras"
    });
  }
  registerUserModel(email, password, firstName, lastName)
    .then(() => res.render('register', { message: "Cadastro efetuado com sucesso!" }))
}

module.exports = {
  registerForm,
  register
};

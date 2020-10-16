const user = require('../models/userModel');

let message = '';

const cadastroForm = (req, res) => res.render('cadastro', { message });

const validarEmailePassword = (email, password, passwordconfirm) => {
  if (!email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i)) {
    return (message = 'O email deve ter o formato email@mail.com');
  } else if (password.length < 6) {
    return (message = 'A senha deve ter pelo menos 6 caracteres');
  } else if (password !== passwordconfirm) {
    return (message = 'As senhas tem que ser iguais');
  } return null;
};
const validarNomeeSobrenome = (name, lastName) => {
  if (typeof name !== 'string' || name.length <= 3) {
    return (message =
      'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  } else if (typeof lastName !== 'string' || lastName.length <= 3) {
    return (message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  } return null;
};
const entrar = async (req, res) => {
  const {
    emailInput,
    passwordInput,
    passwordConfirmInput,
    firstNameInput,
    lastNameInput,
  } = req.body;
  if (
    validarEmailePassword(emailInput, passwordInput, passwordConfirmInput) ||
    validarNomeeSobrenome(firstNameInput, lastNameInput)

  ) {
    return res.render('cadastro', { message });
  }
  user.addUser(emailInput, passwordInput, firstNameInput, lastNameInput);
  message = 'Cadastro efetuado com sucesso!';
  return res.render('cadastro', { message });
};
module.exports = { cadastroForm, entrar };

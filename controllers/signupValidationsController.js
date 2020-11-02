// https://regexr.com/3e48o
const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
let message;

const emailValidation = (email) => {
  if (!regex.test(email)) {
    message = 'O email deve ter o formato email@mail.com';
    return message;
  }
  return message;
};

const passwordValidation = (password) => {
  if (password.length < 6) {
    message = 'A senha deve ter pelo menos 6 caracteres';
    return message;
  }
  return message;
};

const passwordCheckValidation = (passwordCheck, password) => {
  if (passwordCheck !== password) {
    message = 'As senhas tem que ser iguais';
    return message;
  }
  return message;
};

const firstNameValidation = (firstName) => {
  if (firstName.length < 3 || typeof firstName !== 'string') {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
    return message;
  }
  return message;
};

const lastNameValidation = (lastName) => {
  if (lastName.length < 3 || typeof lastName !== 'string') {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
    return message;
  }
  return message;
};

module.exports = {
  emailValidation,
  passwordValidation,
  passwordCheckValidation,
  firstNameValidation,
  lastNameValidation,
};

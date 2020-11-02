// https://regexr.com/3e48o
const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const emailValidation = (email) => {
  if (!regex.test(email)) {
    const message = 'O email deve ter o formato email@mail.com';
    return message;
  }
};

const passwordValidation = (password) => {
  if (password.length < 6) {
    const message = 'A senha deve ter pelo menos 6 caracteres';
    return message;
  }
};

const passwordCheckValidation = (passwordCheck, password) => {
  if (passwordCheck !== password) {
    const message = 'As senhas tem que ser iguais';
    return message;
  }
};

const firstNameValidation = (firstName) => {
  if (firstName.length < 3 || typeof firstName !== 'string') {
    const message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
    return message;
  }
};

const lastNameValidation = (lastName) => {
  if (lastName.length < 3 || typeof lastName !== 'string') {
    const message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
    return message;
  }
};

module.exports = {
  emailValidation,
  passwordValidation,
  passwordCheckValidation,
  firstNameValidation,
  lastNameValidation,
};

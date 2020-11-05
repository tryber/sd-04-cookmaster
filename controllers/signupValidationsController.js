const emailValidation = (email) => {
  // https://regexr.com/3e48o
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return 'O email deve ter o formato email@mail.com';
  }
  return '';
};

const passwordValidation = (password, passwordCheck) => {
  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  if (passwordCheck !== password) {
    return 'As senhas tem que ser iguais';
  }
  return '';
};

const nameValidation = (firstName, lastName) => {
  const numberRegex = /[0-9]/;
  if (firstName.length < 3 || numberRegex.test(firstName)) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  if (lastName.length < 3 || numberRegex.test(lastName)) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return '';
};

module.exports = {
  emailValidation,
  passwordValidation,
  nameValidation,
};

let message = '';

const emailValidation = (email) => {
  // https://regexr.com/3e48o
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
  if (!regex.test(email))
    return message = 'O email deve ter o formato email@mail.com';
};

const passwordValidation = (password) => {
  if (password.length < 6)
    return message = 'A senha deve ter pelo menos 6 caracteres'; 
};

const passwordConfirmValidation = (passwordConfirmation, password) => {
  if (passwordConfirmation !== password)
    return message = 'As senhas tem que ser iguais';
};

const firstNameValidation = (firstName) => {
  if (firstName.length < 3 || typeof firstName !== 'string')
    return message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
}

const lastNameValidation = (lastName) => {
  if (lastName.length < 3 || typeof lastName !== 'string')
    return message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
}

module.exports = {
  emailValidation,
  passwordValidation,
  passwordConfirmValidation,
  firstNameValidation,
  lastNameValidation,
};

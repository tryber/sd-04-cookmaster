const validationEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const validationPassword = /^(\d|\w){6,}$/;
const validationName = /\w{3,}/;

const validationsForms = ({ email, password, passwordConfirm, first_name, last_name }) => {
  switch (true) {
    case !validationEmail.test(email):
      return { message: 'O email deve ter o formato email@mail.com' };
    case !validationPassword.test(password):
      return { message: 'A senha deve ter pelo menos 6 caracteres' };
    case password !== passwordConfirm:
      return { message: 'As senhas tem que ser iguais' };
    case !validationName.test(first_name):
      return {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case !validationName.test(last_name):
      return {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { message: 'Cadastro efetuado com sucesso!' };
  }
};

module.exports = { validationsForms };

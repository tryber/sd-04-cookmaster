const emailValidator = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const passwordValidator = /^(\d|\w){6,}$/;
const namesValidator = /\w{3,}/;

const validationModel = ({ email, password, passwordConfirmed, first_name, last_name }) => {
  console.log(email, password, first_name, last_name);
  switch (true) {
    case !emailValidator.test(email):
      return { message: 'O email deve ter o formato email@mail.com' };
    case !passwordValidator.test(password):
      return { message: 'A senha deve ter pelo menos 6 caracteres' };
    case password !== passwordConfirmed:
      return { message: 'As senhas tem que ser iguais' };
    case !namesValidator.test(first_name):
      return {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case !namesValidator.test(last_name):
      return {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { message: 'Cadastro efetuado com sucesso!' };
  }
};

module.exports = { validationModel };

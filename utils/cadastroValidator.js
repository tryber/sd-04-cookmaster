const emailTest = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const nameAndLastTest = /^[A-Za-z]+$/;

const validation = ({ email, password, confirmPass, name, lastName }) => {
  switch (true) {
    case !emailTest.test(email):
      return { message: 'O email deve ter o formato email@mail.com' };
    case password.length < 6:
      return { message: 'A senha deve ter pelo menos 6 caracteres' };
    case password !== confirmPass:
      return { message: 'As senhas tem que ser iguais' };
    case name.length < 3 || !nameAndLastTest.test(name):
      return {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case lastName.length < 3 || !nameAndLastTest.test(lastName):
      return {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { message: 'Cadastro efetuado com sucesso!' };
  }
};

module.exports = validation;

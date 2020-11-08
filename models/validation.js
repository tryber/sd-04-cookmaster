const emailVal = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const passwordVal = /^(\d|\w){6,}$/;
const namesVal = /\w{3,}/;

const validationModel = async ({ email, password, passwordConfirmed, first_name, last_name }) => {
  switch (true) {
    case !emailVal.test(email):
      return { message: 'Formato de email nao aceito' };
    case !passwordVal.test(password):
      return { message: 'Senha não aceita, deve conter no mínimo 6 caracteres' };
    case password !== passwordConfirmed:
      return { message: 'Senhas não estão iguais' };
    case !namesVal.test(first_name):
      return {
        message: 'Nome não aceito, deve conter no mínimo 3 letras',
      };
    case !namesVal.test(last_name):
      return {
        message: 'Sobrenome não aceito, deve conter no mínimo 3 letras',
      };
    default:
      return 400;
  }
};

module.exports = { validationModel };

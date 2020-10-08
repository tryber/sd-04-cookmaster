const EMAIL_REGEX = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const PASS_REGEX = /^(\d|\w){6,}$/;
const NAME_REGEX = /\w{3,}/;

const validation = ({ email, senha, confirmarSenha, nome, sobrenome }) => {
  switch (true) {
    case !EMAIL_REGEX.test(email):
      return { messageEmail: 'O email deve ter o formato email@mail.com' };
    case !PASS_REGEX.test(senha):
      return { messagePass: 'A senha deve ter pelo menos 6 caracteres' };
    case senha !== confirmarSenha:
      return { messagePassAgain: 'As senhas tem que ser iguais' };
    case !NAME_REGEX.test(nome):
      return {
        messageNome: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case !NAME_REGEX.test(sobrenome):
      return {
        messageSobrenome:
          'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { messageSucess: 'Cadastro efetuado com sucesso!', status: 'ok' };
  }
};

module.exports = {
  validation,
};

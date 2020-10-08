const EMAIL_REGEX = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const PASS_REGEX = /^(\d|\w){6,}$/;
const NAME_REGEX = /\w{3,}/;

const validation = ({ email, senha, confirmarSenha, nome, sobrenome }) => {
  switch (true) {
    case !EMAIL_REGEX.test(email):
      return { message: 'O email deve ter o formato email@mail.com' };
    case !PASS_REGEX.test(senha):
      return { message: 'A senha deve ter pelo menos 6 caracteres' };
    case senha !== confirmarSenha:
      return { message: 'As senhas tem que ser iguais' };
    case !NAME_REGEX.test(nome):
      return {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case !NAME_REGEX.test(sobrenome):
      return {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { message: 'Cadastro efetuado com sucesso!', status: 'ok' };
  }
};

module.exports = {
  validation,
};

const connection = require('./connection');

const EMAIL = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const SENHA = /^.{6,}$/;
const NAME = /[a-zA-Z]{3,}/;

const validaString = (string = '', regex) => string.match(regex);
const confirmSenha = (senha1 = '', senha2 = '') => senha1 === senha2;

const validaEmail = (email) => {
  if (!validaString(email, EMAIL)) return 'O email deve ter o formato email@mail.com';
};

const validaSenha = (password, passwordConfirm) => {
  if (!validaString(password, SENHA)) return 'A senha deve ter pelo menos 6 caracteres';
  if (!confirmSenha(password, passwordConfirm)) return 'As senhas tem que ser iguais';
}

const validaNome = (nome) => {
  if (!validaString(nome, NAME)) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
}

const validaSobrenome = (sobrenome) => {
  if (!validaString(sobrenome, NAME)) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
}

const createUser = async (email, password, nome, sobrenome) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, nome, sobrenome)
      .execute(),
  );

const findByEmail = async (emailInput) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select([])
        .where('email =:emailInput')
        .bind('emailInput', emailInput)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }));
};

const findById = async (idInput) => {
  return connection()
    .then((db) =>
      db.getTable('users').select([]).where('id =:idInput').bind('idInput', idInput).execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }))
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  validaEmail,
  validaSenha,
  validaNome,
  validaSobrenome,
  createUser,
  findByEmail,
  findById,
};

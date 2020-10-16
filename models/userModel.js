const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emailUser) => {
  const data = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', emailUser)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
  return data;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (idUser) => {
  const data = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', idUser)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
  return data;
};

// Validações
// email
// Referência regex do email
// https://www.w3resource.com/javascript/form/email-validation.php
const isValidEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email || !regexEmail.test(email)) return 'O email deve ter o formato email@mail.com';
  return null;
};

// password
const isValidPassword = (password) => {
  if (!password || password.length < 6) return 'A senha deve ter pelo menos 6 caracteres';
  return null;
};

// repeatPassword
const isValidRepeatPassword = (password, repeatPassword) => {
  if (!repeatPassword || password !== repeatPassword) return 'As senhas tem que ser iguais';
  return null;
};
// name and lastName
// Referência regex para apenas letras
// https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=To%20get%20a%20string%20contains,is%20the%20complete%20web%20document.
const isValidName = (name, text) => {
  const regexLetters = /^[A-Za-z]+$/;
  if (name.length < 3 || !regexLetters.test(name)) return text;
  return null;
};

const add = (email, password, name, lastName) => {
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  isValidEmail,
  isValidPassword,
  isValidRepeatPassword,
  isValidName,
  add,
};

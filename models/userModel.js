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
// https://emailregex.com/
// https://www.w3resource.com/javascript/form/email-validation.php
const isValidEmail = (email) => {
  // const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]
  // {1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email || !regexEmail.test(email)) return false;
  return true;
};

// password
const isValidPassword = (password) => {
  if (!password || password.length < 6) return false;
  return true;
};

// repeatPassword
const isValidRepeatPassword = (password, repeatPassword) => {
  if (!repeatPassword || password !== repeatPassword) return false;
  return true;
};
// name
// Referência regex para apenas letras
// https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=To%20get%20a%20string%20contains,is%20the%20complete%20web%20document.
// O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras
const isValidName = (name) => {
  const regexLetters = /^[A-Za-z]+$/;
  if (name.length < 3 || !regexLetters.test(name)) return false;
  return true;
};
// lastName
const isValidLastName = (lastName) => {
  const regexLetters = /^[A-Za-z]+$/;
  if (lastName.length < 3 || !regexLetters.test(lastName)) return false;
  return true;
};

const add = async (email, password, name, lastName) => {
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
  isValidLastName,
  add,
};

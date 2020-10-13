/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };
const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} userMail Email do usuário a ser encontrado
 */
const findByEmail = async (userMail) => {
  // return TEMP_USER;
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :userMail_param')
        .bind('userMail_param', userMail)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} userId ID do usuário
 */
const findById = async (userId) => {
  // return TEMP_USER;
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :userId_param')
        .bind('userId_param', userId)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};

const isValidName = (name, res) => {
  if (!name || name.includes(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) || name.length < 3) {
    res.render('signUp', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
};
const isValidLastname = (lastname, res) => {
  if (!lastname || lastname.includes(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) || lastname.length < 3) {
    res.render('signUp', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
};
const isValidMail = (mail, res) => {
  if (!mail) res.render('signUp', { message: 'O email deve ter o formato email@mail.com' });
};

const isvalidPass = (password, res) => {
  if (!password || password.length < 6) {
    res.render('signUp', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }
};
const isValidCheck = (password, passwordCheck, res) => {
  if (password !== passwordCheck) res.render('signUp', { message: 'As senhas tem que ser iguais' });
};

const addUser = async (name, lastname, mail, password) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(mail, password, name, lastname)
      .execute(),
  );

const getPass = async (id) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .select('password')
      .where('id = :idBind')
      .bind('idBind', id)
      .execute(),
  )
  .then((results) => results.fetchOne())};

module.exports = {
  findByEmail,
  findById,
  isValidName,
  isValidLastname,
  isValidMail,
  isvalidPass,
  isValidCheck,
  addUser,
  getPass,
};

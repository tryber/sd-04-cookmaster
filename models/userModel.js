const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} Email Email do usuário a ser encontrado
 */
const findByEmail = async (Email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', Email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} Id ID do usuário
 */
const findById = async (Id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id_param')
        .bind('id_param', Id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }));
};

// Faz o cadastro do usuário na tabela (users)
const addUser = async (email, passWord, firstName, lastName) => {
  await connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, passWord, firstName, lastName)
      .execute(),
  );
};

/** Formulário validações
 *
 *Valida email
 *@param {email}
 */
const isValidEmail = (email) => {
  let ver = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!ver.test(email)) {
    return false;
  }
  return true;
};

/**Valida name
 * @param {name}
 */
const isValidName = (name) => {
  const checkNumber = /[0-9]/; //verifica numeros

  if (name.length < 3 || checkNumber.test(name)) {
    return false;
  }
  return true;
};

/**Valida lastName
 * @param {lastName}
 */
const isValidLastName = (lastName) => {
  const checkNumber = /[0-9]/; //verifica numeros

  if (lastName.length < 3 || checkNumber.test(lastName)) {
    return false;
  }
  return true;
};

/**Valida senha
 * @param {password}
 */
const isValidPassWord = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

/**Compara senhas
 * @param {*} password
 * @param {*} confirmPassWord
 */
const comparPassword = (password, confirmPassWord) => {
  if (password != confirmPassWord) {
    return false;
  }
  return true;
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  isValidEmail,
  isValidPassWord,
  isValidName,
  isValidLastName,
  comparPassword,
};

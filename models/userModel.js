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

const userTable = async () => {
  const users = await connection('cookmaster');
  return users.getTable('users');
};

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emailInp) => {
  try {
    const db = await userTable();
    const userSelect = await db
      .select([])
      .where('email = :email')
      .bind('email', emailInp)
      .execute();

    const [id, email, password, name, lastName] = await userSelect.fetchOne();
    return {
      id,
      email,
      password,
      name,
      lastName,
    };
  } catch (error) {
    return error;
  }
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (idInp) => {
  try {
    const db = await userTable();
    const userSelect = await db.select([]).where('id = :id').bind('id', idInp).execute();

    const [id, email, password, name, lastName] = await userSelect.fetchOne();
    return {
      id,
      email,
      password,
      name,
      lastName,
    };
  } catch (error) {
    return error;
  }
};

const createUserModel = async (email, password, name, lastName) => {
  try {
    const db = await userTable();
    const createUsers = await db
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute();
    return createUsers;
  } catch (error) {
    return error;
  }
};

const editUserModel = async (id, email, password, name, lastName) => {
  try {
    const db = await userTable();
    return await db
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', name)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute();
  } catch (error) {
    return error;
  }
};

module.exports = {
  findByEmail,
  findById,
  createUserModel,
  editUserModel,
};

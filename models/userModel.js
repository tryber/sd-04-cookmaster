const connection = require('./connection');
require('dotenv/config');
/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
const TEMP_USER = {
  id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
  email: 'taylor.doe@company.com',
  password: 'password',
  name: 'Taylor',
  lastName: 'Doe',
};

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  try {
    const db = await connection();
    const results = await db
      .getTable('users')
      .select([])
      .where('email = :email')
      .bind('email', email)
      .execute();

    const user = {};
    [user.id, user.email, user.password, user.name, user.lastName] = await results.fetchOne();

    return user;
  } catch (err) {
    return err;
  }
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  try {
    const db = await connection();
    const results = await db
      .getTable('users')
      .select([])
      .where('id = :id')
      .bind('id', id)
      .execute();

    const user = {};
    [user.id, user.email, user.password, user.name, user.lastName] = await results.fetchOne();
    
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findByEmail,
  findById,
};

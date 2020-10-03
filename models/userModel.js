/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emaildig) => {
  const db = await connection();
  const userTable = await db.getTable('users')
    .select([])
    .where('email = :email')
    .bind('email', emaildig)
    .execute();
  const [id, email, password, name, lastName] = await userTable.fetchOne();
  return { id, name, lastName, email, password };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (Id) => {
  const db = await connection();
  const userTable = await db.getTable('users')
    .select([])
    .where('id = :id')
    .bind('id', Id)
    .execute();
  const [id, email, password, name, lastName] = await userTable.fetchOne();
  return { id, name, lastName, email, password };
};

module.exports = {
  findByEmail,
  findById,
};

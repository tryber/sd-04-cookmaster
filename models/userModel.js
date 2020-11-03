const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
// Abaixo está uma implementação do método `findByEmail` - README fornecido pela Trybe.
const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection()
  .then((db) =>
  db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};

// Usuário precisa ter: ID, E-mail, Senha, Nome e Sobrenome (obrigatórios)
// ID deve ser gerado automaticamente, não devendo ser preenchido no momento do cadastro.
const registerModel = async ({ email, password, name, lastName }) => {
  return connection()
  .then((db) => 
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
  registerModel,
};

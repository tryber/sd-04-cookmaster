const connection = require('./connection');

const findByEmail = async (email) => {
  const emailData = await connection()
    .then((db) =>
      db.getTable('users').select([]).where('email = :email').bind('email', email)
      .execute(),
    )
    .then((results) => results.fetchAll());

  const user = {};
  [user.id, user.email, user.password, user.first_name, user.last_name] = emailData[0];
  return user;
};

const findById = async (id) => {
  const idData = await connection()
    .then((db) => db.getTable('users').select([]).where('id = :id').bind('id', id)
    .execute())
    .then((results) => results.fetchAll());

  const user = {};
  [user.id, user.email, user.password, user.first_name, user.last_name] = idData[0];
  return user;
};

const cadastrarUsuario = async (email, senha, nome, sobrenome) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, senha, nome, sobrenome)
      .execute(),
  );

const atualizarUsuario = (email, senha, nome, sobrenome, id) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', senha)
      .set('first_name', nome)
      .set('last_name', sobrenome)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  cadastrarUsuario,
  atualizarUsuario,
};

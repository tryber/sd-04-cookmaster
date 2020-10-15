const connection = require('./connection');

const receitaById = async (id) => {
  const idData = await connection()
    .then((db) => db.getTable('recipes').select([]).where('id = :id').bind('id', id).execute())
    .then((results) => results.fetchAll());

  const receita = {};
  [
    receita.id,
    receita.user_id,
    receita.user,
    receita.name,
    receita.ingredients,
    receita.instructions,
  ] = idData[0];
  return receita;
};

const receitaByNome = async (nome) => {
  const nomeData = await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name'])
        .where('name like :nome')
        .bind('nome', `%${nome}%`)
        .execute(),
    )
    .then((resultado) => resultado.fetchAll());
  const receita = nomeData.map(([id, userId, user, name]) => ({ id, userId, user, name }));
  return receita;
};

const cadastrarReceita = async (email, senha, nome, sobrenome) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, senha, nome, sobrenome)
      .execute(),
  );

module.exports = {
  receitaById,
  receitaByNome,
  cadastrarReceita,
};

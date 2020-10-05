const connection = require('./connection');

// const findAll = async () =>
//   connection()
//     .then((db) => db.getTable('recipes').select(['name', 'user']).execute())
//     .then((results) => results.fetchAll())
//     .then((recipes) => recipes.map(([name, user]) => ({ name, user })));

const findAll = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['name', 'user']).execute();
  const recipes = await results.fetchAll();
  // fetchAll busca todas as linhas do resultado do banco
  return recipes.map(([name, user]) => ({ name, user }));
};

module.exports = {
  findAll,
};

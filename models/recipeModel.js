const connection = require('./connection');

// Busca receitas do banco de dados
const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((resultados) => resultados.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

const searchRecipesModel = async (search) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${search}%`)
        .execute(),
    )
  .then((resultados) => resultados.fetchAll())
  .then((recipes) =>
    recipes.map(([id, user, name]) => ({
      id,
      user,
      name,
    })),
  );

// Exportando métodos para o Controller
module.exports = {
  findAll,
  searchRecipesModel,
};

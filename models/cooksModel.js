const connection = require('./connection');

//função pega todas as receitas do BD
const listCook = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((resul) => resul.map(([id, user, name]) => ({ id, user, name })));

// função que pega apenas receita específica do BD

const listSpecificRecipe = async (recipeId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id =:id')
        .bind('id', recipeId)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, idUser, user, name, ingredients, instructions]) => ({
      id,
      idUser,
      user,
      name,
      ingredients,
      instructions,
    }));

module.exports = { listCook, listSpecificRecipe };

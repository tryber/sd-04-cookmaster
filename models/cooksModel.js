const connection = require('./connection');

// função pega todas as receitas do BD
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

const getSpecificRecipe = async (q) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .orderBy(['name'])
        .bind('name', `%${q}%`)
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then((data) =>
      data.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const createNewRecipes = async (userId, userName, nameRecipe, ingredients, prepare) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values([userId, userName, nameRecipe, ingredients, prepare])
      .execute(),
  );

const verifyRecipes = (nameRecipe, ingredients, prepare) => nameRecipe && ingredients && prepare;

const updateRecipes = async (id, recipeName, ingredients, prepare) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', recipeName)
      .set('ingredients', ingredients)
      .set('instructions', prepare)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

const confirmRemove = async (id) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

module.exports = {
  listCook,
  listSpecificRecipe,
  getSpecificRecipe,
  createNewRecipes,
  verifyRecipes,
  updateRecipes,
  confirmRemove,
};

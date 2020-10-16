const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((data) => data.map(([id, user, name]) => ({ id, user, name })));

const findRecipeById = async (ids) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id_param')
        .bind('id_param', ids)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

const findRecipeByName = async (recipeName) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${recipeName}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((data) => data.map(([id, user, name]) => ({ id, user, name })));

const newRecipe = async (data) => {
  const { id, nome, receita, ingredientes, preparo } = data;
  const string = ingredientes.toString();
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(id, nome, receita, string, preparo)
      .execute(),
  );
};

const allByUser = (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name'])
        .where('user_id like :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((data) => data.map(([id, userId, user, name]) => ({ id, userId, user, name })));

module.exports = {
  allByUser,
  getAllRecipes,
  findRecipeById,
  findRecipeByName,
  newRecipe,
};

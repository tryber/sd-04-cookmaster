const connection = require('./connection');

// Obtên todas as receitas
const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    )
    .catch((err) => {
      throw err;
    });

// Obtên receitas por id
const getRecipesId = async (idUser) =>
  await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :idBind')
        .bind('idBind', idUser)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.forEach(([userId, user, name, ingredients, instructions]) => ({
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    )
    .catch((err) => {
      throw err;
    });

// Busca receita
const findRecipes = async (recipe) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select([])
        .where('name like :idBind')
        .bind('idBind', `%${recipe}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((data) =>
      data.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

/**
 * Cadastro de receita
 * @param {*} userId
 * @param {*} user
 * @param {*} name
 * @param {*} ingredients
 * @param {*} instructions
 */
const addRecipes = async (userId, user, name, ingredients, instructions) => {
  await connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute(),
  );
};

module.exports = { getAllRecipes, addRecipes, getRecipesId, findRecipes };

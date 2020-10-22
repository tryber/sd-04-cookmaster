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
const getRecipeId = async (idRecipe) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :idBind')
        .bind('idBind', idRecipe)
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
    }))
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

// Atualiza receita
const updateRecipe = async (id, name, ingredients, instructions) => {
  const seperador = ingredients.toString();
  try {
    // console.log(id, name, ingredients, instructions);
    const db = await connection();
    const update = await db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', seperador)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute();
    return update.getAffectedItemsCount();
  } catch (error) {
    return null;
  }
};

// Deleta receita
const removeRecipes = async (id) =>
  connection().then((db) =>
    db.getTable('recipes').delete().where('id = :id').bind('id', id)
    .execute(),
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

module.exports = {
  getAllRecipes,
  addRecipes,
  getRecipeId,
  findRecipes,
  updateRecipe,
  removeRecipes,
};

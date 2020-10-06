const { tables, getTableObj } = require('./connection');

const getAllRecipes = () => getTableObj(
  tables.recipes((r) => r.select([]).execute()),
  'fetchAll',
);

const getRecipeById = (id) => getTableObj(
  tables.recipes((r) => r.select([]).where('id = :id').bind('id', id).execute()),
  'fetchOne',
);

const updateRecipe = (id, { name, ingredients, instructions }) => tables.recipes(
  (r) => r.update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute(),
);

const insertRecipe = (
  { name, ingredients, instructions },
  { id: userId, first_name: first, last_name: last },
) => tables.recipes((r) => r.insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
  .values([userId, `${first} ${last}`, name, ingredients, instructions])
  .execute());

const searchByName = (name) => getTableObj(
  tables.recipes((r) => r.select([]).where('name LIKE :name').bind('name', `%${name}%`).execute()),
  'fetchAll',
);

module.exports = {
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  insertRecipe,
  searchByName,
};

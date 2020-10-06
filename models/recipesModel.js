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

module.exports = {
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};

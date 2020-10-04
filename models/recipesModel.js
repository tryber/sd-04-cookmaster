const { tables } = require('./connection');

const getAllRecipes = () => tables.recipes((r) => r.select([]).execute(), 'fetchAll');

const getRecipeById = (id) => tables.recipes(
  (r) => r.select([]).where(`id = ${id}`).execute(),
  'fetchOne',
);

module.exports = {
  getAllRecipes,
  getRecipeById,
};

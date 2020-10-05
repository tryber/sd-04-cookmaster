const recipeSearchInput = (req, res) =>
  res.render('recipesSearch', { user: req.user });

module.exports = {
  recipeSearchInput,
};

const recipeSearchInput = (req, res) => {
  console.log(res.query)
  res.render('recipesSearch', { user: req.user })
};

module.exports = {
  recipeSearchInput,
};

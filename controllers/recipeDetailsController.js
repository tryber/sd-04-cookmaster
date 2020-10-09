const Recipe = require('../models/recipeDetailsModel');

const showDetails = async (req, res) => {
  const { id } = req.params;
  const { user = '' } = req;

  const details = await Recipe.recipeDetailsById(id);
  res.render('recipeDetails', { details, user });
};

module.exports = {
  showDetails,
};

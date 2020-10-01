const { getRecipes } = require('../models/recipeModel');

const recipesController = async (req, res) => {
    const recipes = await getRecipes();
    console.log(`controller recipe: ${recipes}`)

    return res.render('home', { recipes });
}

module.exports = recipesController;
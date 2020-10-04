const recipesNewForm = (req, res) => {
  return res.render('recipesNew');
};

const recipesNew = (req, res) => {
  console.log(req.body)
}


module.exports = {
  recipesNewForm,
  recipesNew,
};

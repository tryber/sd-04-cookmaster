const searchModel = require('../models/searchModel');

const searchController = async (req, res) => {
  const { user = '' } = req;
  const { q } = req.query;

  const search = await searchModel.findByInput(q);

  res.render('search', { search, user });
};

module.exports = {
  searchController,
};

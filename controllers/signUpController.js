const signUp = (req, res) => {
  return res.render('admin/signUp', {
    message: null,
    done: false,
  })
};

module.exports = { signUp };

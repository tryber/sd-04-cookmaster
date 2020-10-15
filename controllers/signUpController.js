const userModel = require('../models/userModel');

const signUp = (req, res) =>
  res.render('admin/signUp', {
    messages: null,
    done: false,
  });

const finishsignUp = async (req, res) => {
  if (req.validated) {
    const { email, password, firstName, lastName } = req.body;
    await userModel.addUser(email, password, firstName, lastName);
    return res.status(200).render('admin/signUp', {
      messages: null,
      done: true,
    });
  }
  return res.status(400).render('admin/signUp', {
    messages: req.messages,
    done: false,
  });
};

module.exports = { signUp, finishsignUp };

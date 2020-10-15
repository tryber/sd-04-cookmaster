const userModel = require('../models/userModel');

const signUp = (req, res) =>
  res.render('admin/signUp', {
    messages: null,
    done: false,
  });

const finishsignUp = async (req, res) => {
  if (req.validated) {
    await userModel.addUser({ ...req.body });
    return res.status(200).render('admin/signUp', {
      messages: req.messages,
      done: true,
    });
  }
  return res.status(400).render('admin/signUp', {
    messages: req.messages,
    done: false,
  });
};

module.exports = { signUp, finishsignUp };

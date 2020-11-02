const validation = (req, res, next) => {
  const {
    email, password, confirm, name, lastname,
  } = req.body;

  const emailPattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  if (!emailPattern.test(email)) res.render('users/register', { error: 'email', success: false });

  if (password.length < 6) res.render('users/register', { error: 'password', success: false });

  if (password !== confirm) res.render('users/register', { error: 'confirm', success: false });

  if (!/^[a-z]+$/i.test(name) || name.length < 3) {
    return res.render('users/register', { error: 'name', success: false });
  }

  if (!/^[a-z]+$/i.test(lastname) || lastname.length < 3) {
    return res.render('users/register', { error: 'lastname', success: false });
  }

  return next();
};

module.exports = validation;

const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForuser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }
      const user = new User({
        email: email,
        password: password
      });

      user.save()
        .then(() => res.json({ token: tokenForuser(user) }))
        .catch(err => next(err));
    })
    .catch(err => next(err))


}


exports.signin = function (req, res, next) {
  res.send({ token: tokenForuser(req.user) })
}
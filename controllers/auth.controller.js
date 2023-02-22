const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');
const { GENERIC_ERROR_MESSAGE } = require('../config/passport.config');
const mailer = require('../config/mailer.config');


//SignUp

module.exports.signup = (req, res, next) => {
  res.render('auth/signup')
}

module.exports.doSignup = (req, res, next) => {
  const renderWithErrors = (errors) => {
    const userData = { ...req.body }
    delete userData.password
    delete userData.repeatPassword

    res.render('auth/signup', {
      user: userData,
      errors
    })
  }

  const { password, repeatPassword, username, email } = req.body;

  if (password && repeatPassword && password === repeatPassword) {
    User.findOne({ username, email })
      .then(user => {
        if (user) {
          renderWithErrors({ email: 'Username or email already in use' })
        } else {
          return User.create(req.body)
            .then(userCreated => {
              mailer.sendActivationEmail(userCreated.email, userCreated.activationToken)
              res.redirect('/login')
            })
        }
      })
      .catch(err => {
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors)
        } else {
          next(err)
        }
      })
  } else {
    renderWithErrors({ password: 'Passwords don\'t match' })
  }
}

//Login

module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

const doLoginWithStrategy = (req, res, next, strategy = 'local-auth') => {
  const { email, password } = req.body;
  if (strategy === 'local-auth') {

    if (!email || !password) {
      res.status(404).render('auth/login', { errorMessage: GENERIC_ERROR_MESSAGE })
    }
  }

  passport.authenticate(strategy, (err, user, validations) => {
    if (err) {
      next(err)
    } else if (!user) {
      res.status(404).render('auth/login', { user: { email }, errorMessage: validations.error })
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(loginError)
        } else {
          req.flash('flashMessage', 'You have succesfully signed in')
          res.redirect('/products');
        }
      })
    }
  })(req, res, next)
}

module.exports.doLogin = (req, res, next) => {
  doLoginWithStrategy(req, res, next)
}

module.exports.doLoginGoogle = (req, res, next) => {
  doLoginWithStrategy(req, res, next, 'google-auth')
}

module.exports.doLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login')
}

module.exports.activate = (req, res, next) => {
  const activationToken = req.params.token;

  User.findOneAndUpdate(
    { activationToken, active: false },
    { active: true }
  )
    .then(() => {
      req.flash('flashMessage', 'You have activated your account. Welcome!')
      res.redirect('/login')
    })
    .catch(err => next(err))
}
module.exports = {
  authCheck: function(req, res, next) {
    if(req.cookies.login) {
      next();
    } else {
      res.redirect('/sign-in');
    }
  },

  loginCheck: function(req, res, next) {
    if(req.cookies.login) {
      res.redirect('/create');
    } else {
      next();
    }
  }
}

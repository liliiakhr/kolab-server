const isLoggedIn = (req, res, next) => {
    if (req.session.loggedInUser) {
      next()
    }
    else {
      res.status(401).json({
          errorMessage: 'Not an authorized user'
        })
    }
};



module.exports = {isLoggedIn};
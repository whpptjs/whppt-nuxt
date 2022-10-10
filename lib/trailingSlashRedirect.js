const { withoutTrailingSlash } = require('ufo');

module.exports = (req, res, next) => {
  const without = withoutTrailingSlash(req.originalUrl, true);
  if (req.originalUrl !== without) return res.redirect(without);
  next();
};

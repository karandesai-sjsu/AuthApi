const jwt = require('jsonwebtoken');

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send('Access denied.');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (req.user.role !== requiredRole) {
        return res.status(403).send('Access denied not enough permissions.');
      }

      next();
    } catch (error) {
      res.status(400).send('Invalid token.');
    }
  };
};

module.exports = roleMiddleware;
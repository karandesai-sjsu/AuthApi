const jwt = require('jsonwebtoken');

exports.roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    let token;

    if (req.headers.client === 'not-browser') {
      token = req.headers.authorization;
    } else {
      token = req.cookies['Authorization'];
    }

    if (!token) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    try {
      const userToken = token.startsWith('Bearer%') ? token.slice(7) : token.split(' ')[1];
      const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);

      if (jwtVerified) {
        req.user = jwtVerified;
        console.log(req.user)
        if (req.user.role.trim().toLowerCase() !== requiredRole.trim().toLowerCase()) {
          return res.status(403).json({ success: false, message: 'Access denied. Not enough permissions.' });
        }

        next();
      } else {
        throw new Error('Error in the token');
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: 'Invalid token.' });
    }
  };
};
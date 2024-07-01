import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const AuthMiddleware = {
  isAuthenticated: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: 'Authorization header is required' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ msg: 'Proper Authorization token format is required (Bearer <token>)' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  },

  isAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin role required' });
    }
    next();
  }
};

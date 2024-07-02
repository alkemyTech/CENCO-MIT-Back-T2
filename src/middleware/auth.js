import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).json({ message: 'Authorization header is required' }); // No auth header provided
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No token provided' }); // No token provided
    }
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' }); // Token is invalid
      }
      req.user = user; // Add user to request
      next();
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin role required' }); // Admin role required
  }
  next();
};

import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Token is invalid
    req.user = user; // Attach user information to request
    next();
  });
};

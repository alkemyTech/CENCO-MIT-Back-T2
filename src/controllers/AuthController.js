import { UserService } from '../services/index.js';
import { isEmailValid } from '../utils/index.js';

export const AuthController = {
  signup: async function (req, res, next) {
    try {
      const user = req.body;
      const foundUser = await UserService.getByEmail(user.email);
      if (foundUser) res.status(400).json({ error: 'User already exists' });
      if (
        !user ||
        !user.name ||
        !user.surname ||
        !user.email ||
        !user.password
      ) {
        res.status(400).json({ error: 'Invalid user format' });
      }
      if (!isEmailValid(user.email)) res.status(400).json({ error: 'Invalid email' });
      if (user.role && (user.role !== 'admin' || user.role !== 'user')) {
        res.status(400).json({ error: 'Invalid role' });
      }
      await UserService.create(user);
      const newUser = await UserService.getByEmail(user.email);
      if (!newUser) res.status(500).json({ error: 'Error creating user' });
      delete newUser.dataValues.password;
      res.send(newUser);
      next();
    } catch (error) {
      next(error);
    }
  },

  login: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      if (!token) res.status(400).json({ error: 'Invalid credentials' });
      res.send({ message: 'Login successful', data: { token } });
      next();
    } catch (err) {
      next(err);
    }
  },
};

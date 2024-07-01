import { UserService } from '../services/index.js';

export const AuthController = {
  signup: async function (req, res, next) {
    try {
      const user = req.body;
      const newUser = await UserService.create(user);
      delete newUser.password;
      res.status(201).json(newUser);
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

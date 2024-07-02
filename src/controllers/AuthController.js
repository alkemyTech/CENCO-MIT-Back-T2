import { UserService } from '../services/index.js';

export const AuthController = {
  signup: async function (req, res, next) {
    try {
      const user = req.body;
      const userCreated = await UserService.create(user);
      res.status(201).json({
        message: 'Signed up successfully',
        data: userCreated
      });
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
      res.send({ message: 'Logged in successfully', data: { token } });
      next();
    } catch (err) {
      next(err);
    }
  },
};

import { UserService } from '../services/index.js';

export const AuthController = {
  signup: async function (req, res, next) {
    try {
      const user = req.body;
      const userCreated = await UserService.create(user);
      delete userCreated.password;
      res.send({
        message: 'Signup successfuly',
        data: userCreated
      });
      next();
    } catch (error) {
      console.error('Error controller ->', error.message);
      res.status(400).json({
        message: error.message
      });
      next(error);
    }
  },

  login: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      if (!token) res.send({ message: 'Invalid credentials' });
      res.send({ message: 'Login successful', data: { token } });
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

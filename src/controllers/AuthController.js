import { UserService } from '../services/index.js';

export const AuthController = {
  signup: async function (req, res, next) {
    try {
      const user = req.body;
      await UserService.create(user);
      const newUser = await UserService.getByEmail(user.email);
      delete newUser.dataValues.password;
      res.send(newUser);
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  login: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      if (!token) res.send({ message: 'Invalid credentials' });
      if (token) {
        res.send({ message: 'Login successful', data: { token } });
      }
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

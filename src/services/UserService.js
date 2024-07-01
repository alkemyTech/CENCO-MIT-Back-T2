import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/index.js';
import { isEmailValid } from '../utils/index.js';

const salt = process.env.SALT;
const secret = process.env.JWT_SECRET;

export const UserService = {
  create: async user => {
    try {
      const foundUser = await UserRepository.getByEmail(user.email);
      const err = new Error();
      if (foundUser) {
        err.message = 'User already exists';
        err.statusCode = 400;
        throw err;
      }
      if (!isEmailValid(user.email)) {
        err.message = 'Invalid email';
        err.statusCode = 400;
        throw err;
      }
      if(!user || !user.name || !user.surname || !user.email || !user.password) {
        err.message = 'Invalid user data';
        err.statusCode = 400;
        throw err;
      }
      if (user.role && (user.role !== 'admin' && user.role !== 'user')) {
        err.message = 'Invalid role';
        err.statusCode = 400;
        throw err;
      }
      const hash = await bcrypt.hash(user.password, parseInt(salt));
      user.password = hash;
      const newUser = await UserRepository.postUser(user);
      delete newUser.dataValues.password;
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  login: async function (email, password) {
    try {
      const data = await UserService.getByEmail(email);
      const user = data.dataValues;
      if (!user) return null;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return null;
      return jwt.sign({ email, role: user.role }, secret, {
        expiresIn: '15m',
      });
    } catch (err) {
      console.error(err);
    }
  },

  getUsers: async () => UserRepository.getUsers(),

  getById: async id => UserRepository.getById(id),

  getByEmail: async email => UserRepository.getByEmail(email),

  updateUser: async (user, id) => {
    try {
      if (!isEmailValid(user.email)) return;
      const hash = await bcrypt.hash(user.password, parseInt(salt));
      user.password = hash;
      await UserRepository.updateUser(user, id);
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async id => UserRepository.deleteUser(id),
};

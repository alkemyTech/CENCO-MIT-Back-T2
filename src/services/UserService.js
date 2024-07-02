import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/index.js';
import { isEmailValid } from '../utils/index.js';

const salt = process.env.SALT;
const secret = process.env.JWT_SECRET;

export const UserService = {
  create: async user => {
    const err = new Error();
    err.statusCode = 400;
    try {
      const userFound = await UserRepository.getByEmail(user.email);
      if (userFound) {
        err.message = 'User already exists';
        throw err;
      }
      if (
        !user ||
        !user.name ||
        !user.surname ||
        !user.password ||
        !user.email
      ) {
        err.message = 'Invalid user data';
        throw err;
      }
      if (!isEmailValid(user.email)) {
        err.message = 'Invalid email';
        throw err;
      }
      if (user.role && user.role !== 'admin' && user.role !== 'user') {
        err.message = 'Invalid role';
        throw err;
      }
      const hash = await bcrypt.hash(user.password, parseInt(salt));
      user.password = hash;
      await UserRepository.postUser(user);
      const newUser = await UserService.getByEmail(user.email);
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  login: async function (email, password) {
    const err = new Error();
    err.message = 'Invalid credentials';
    err.statusCode = 401;
    try {
      const user = await UserRepository.getByEmail(email);
      if (!user) throw err;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw err;
      return jwt.sign({ email, role: user.role }, secret, {
        expiresIn: '15m',
      });
    } catch (error) {
      throw error;
    }
  },

  getUsers: async () => {
    const users = await UserRepository.getUsers();
    users.map(user => {
      delete user.dataValues.password;
      return user;
    });
    return users;
  },

  getById: async id => {
    const err = new Error();
    err.statusCode = 404;
    try {
      const user = await UserRepository.getById(id);
      if (!user) {
        err.message = 'User not found';
        throw err;
      }
      delete user.dataValues.password;
      return user;
    } catch (error) {
      throw error;
    }
  },

  getByEmail: async email => {
    const err = new Error();
    err.statusCode = 404;
    try {
      const user = await UserRepository.getByEmail(email);
      if (!user) {
        err.message = 'User not found';
        throw err;
      }
      delete user.dataValues.password;
      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (user, id) => {
    const err = new Error();
    err.statusCode = 400;
    try {
      const userFound = await UserRepository.getByEmail(user.email);
      if (!userFound) {
        err.message = 'User not found';
        err.statusCode = 404;
        throw err;
      }
      if (
        !user ||
        !user.name ||
        !user.surname ||
        !user.password ||
        !user.email
      ) {
        err.message = 'Invalid user data';
        throw err;
      }
      if (!isEmailValid(user.email)) {
        err.message = 'Invalid email';
        throw err;
      }
      if (user.role && user.role !== 'admin' && user.role !== 'user') {
        err.message = 'Invalid role';
        throw err;
      }
      const hash = await bcrypt.hash(user.password, parseInt(salt));
      user.password = hash;
      await UserRepository.updateUser(user, id);
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async id => {
    const err = new Error();
    err.message = 'User not found';
    err.statusCode = 400;
    try {
      const userFound = await UserRepository.getById(id);
      if (!userFound) throw err;
      const result = await UserRepository.deleteUser(id);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

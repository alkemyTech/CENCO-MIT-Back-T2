import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/index.js';
import { isEmailValid } from '../utils/index.js';

const salt = process.env.SALT;
const secret = process.env.JWT_SECRET;

export const UserService = {
  create: async user => {
    try {
      const userFound = await UserRepository.getByEmail(user.email);
      if (userFound) throw new Error('User already exists');
      if (!user || !user.name || !user.surname || !user.password || !user.email)
        throw new Error('Invalid user data');
      if (!isEmailValid(user.email)) throw new Error('Invalid email');
      const hash = await bcrypt.hash(user.password, parseInt(salt));
      user.password = hash;
      await UserRepository.postUser(user);
      delete user.password;
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },

  login: async function (email, password) {
    try {
      const data = await UserService.getByEmail(email);
      const user = data.dataValues;
      if (!user) throw new Error('User not found');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('Invalid credentials');
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
      const userFound = await UserRepository.getByEmail(user.email);
      if (!userFound) throw new Error('User not found');
      if (!user || !user.name || !user.surname || !user.password || !user.email)
        throw new Error('Invalid user data');
      if (!isEmailValid(user.email)) throw new Error('Invalid email');
      const hash = await bcrypt.hash(user.password, parseInt(salt));
      user.password = hash;
      await UserRepository.updateUser(user, id);
      delete user.password;
      return user;
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async id => UserRepository.deleteUser(id),
};

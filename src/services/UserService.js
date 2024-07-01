import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/index.js';

const salt = process.env.SALT;
const secret = process.env.JWT_SECRET;

export const UserService = {
  create: async (user) => {
    try {
      const hash = await bcrypt.hash(user.password, parseInt(salt));
      user.password = hash;
      await UserRepository.postUser(user);
    } catch (error) {
      console.error(error);
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

  getById: async (id) => UserRepository.getById(id),

  getByEmail: async (email) => UserRepository.getByEmail(email),

  updateUser: async (user, id) => UserRepository.updateUser(user, id),

  deleteUser: async (id) => UserRepository.deleteUser(id),
};

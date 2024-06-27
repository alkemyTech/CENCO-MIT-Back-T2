import { User } from '../models/user.js';

export const UserRepository = {
  getUsers: async function () {
    return await User.findAll();
  },

  getById: async function (id) {
    return await User.findByPk(id);
  },

  getByEmail: async function (email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  },
  postUser: async function (user) {
    const userToAdd = User.create(user);
    const newUser = await userToAdd.save();
    return newUser;
  },
};

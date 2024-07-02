import { UserService } from '../services/index.js';

export const UserController = {
  getAllUsers: async function (req, res, next) {
    try {
      const users = await UserService.getUsers();
      const foundUsers = users.map(user => {
        delete user.dataValues.password;
        return user;
      });
      res.send(foundUsers);
    } catch (err) {
      next(err);
    }
  },
  getUserInfo: async function (req, res, next) {
    try {
      const email = req.user.email; 
      const user = await UserService.getByEmail(email);
      if (!user) res.status(404).json({ message: 'User not found' });
      res.send(user);
      next();
    } catch (err) {
      next(err);
    }
  },

  getById: async function (req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.getById(id);
      if (!user) res.status(404).json({ message: 'User not found' });
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    const user = req.body;
    try {
      await UserService.create(user);
      const newUser = await UserService.getByEmail(user.email);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async function (req, res, next) {
    const user = req.body;
    const { id } = req.params;
    try {
      const updatedUser = await UserService.updateUser(user, id);
      if (!updatedUser) res.status(500).json({ error: 'Error updating user' });
      res.send({message: 'User updated successfully', user: updatedUser});
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async function (req, res, next) {
    const { id } = req.params;
    try {
      const userFound = await UserService.getById(id);
      if (!userFound) res.status(404).json({ error: 'User not found' });
      const isUserDeleted = (await UserService.deleteUser(id)) === 1;
      if (!isUserDeleted) res.status(500).json({ error: 'Error deleting user' });
      res.send({ message: 'User deleted successfully' });
    } catch (err) {
      next(err);
    }
  },
};

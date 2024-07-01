import { UserService } from '../services/index.js';

export const UserController = {
  getUsers: async function (req, res, next) {
    try {
      const users = await UserService.getUsers();
      users.forEach(u => delete u.dataValues.password);
      res.send(users);
    } catch (err) {
      next(err);
    }
  },

  getById: async function (req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.getById(id);
      if (!user) res.status(404).json({ error: 'User not found' });
      delete user.dataValues.password;
      res.send(user);
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    const user = req.body;
    try {
      const foundUser = await UserService.getByEmail(user.email);
      if (foundUser) res.status(400).json({ error: 'User already exists' });
      if (
        !user ||
        !user.name ||
        !user.surname ||
        !user.email ||
        !user.password
      ) {
        res.status(400).json({ error: 'Invalid user data format' });
      }
      await UserService.create(user);
      const newUser = await UserService.getByEmail(user.email);
      delete newUser.dataValues.password;
      res.send(newUser);
      next();
    } catch (error) {
      next(error);
    }
  },

  updateUser: async function (req, res, next) {
    const user = req.body;
    const { id } = req.params;
    try {
      const userFound = await UserService.getById(id);
      if (!userFound) res.status(404).json({ error: 'User not found' });
      if (
        !user ||
        !(user.name && user.surname && user.password && user.email)
      ) {
        res.status(400).json({ error: 'Invalid user update request' });
      }
      const isUserUpdated = await UserService.updateUser(user, id);
      const result = isUserUpdated[0] === 1;
      const updatedUser = await UserService.getById(id);
      delete updatedUser.dataValues.password;
      res
        .status(result ? 200 : 500)
        .json(
          result
            ? { message: 'User updated successfully', user: updatedUser }
            : { error: ' Error updating user' }
        );
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async function (req, res, next) {
    const { id } = req.params;
    try {
      const userFound = await UserService.getById(id);
      if (!userFound) res.status(404).json({ error: 'User not found' });
      const isUserDeleted = await UserService.deleteUser(id);
      const result = isUserDeleted === 1;
      res
        .status(result ? 200 : 500)
        .json(
          result
            ? { message: 'User deleted successfully' }
            : { error: ' Error deleting user' }
        );
    } catch (err) {
      next(err);
    }
  },
};

import { UserService } from '../services/index.js';

export const UserController = {
  getUserInfo: async function (req, res, next) {
    try {
      const email = req.user.email; // get the email of the decoded token
      const data = await UserService.getByEmail(email);

      if (!data) {
        return res.status(404).send('User not found');
      }
      const user = data.dataValues;
      delete user.password;
      res.send(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  getUsers: async function (req, res, next) {
    // TO DO
    res.send('Getting users');
    next();
  },

  getById: async function (req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.getById(id);
      delete user.dataValues.password;
      res.send(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    const user = req.body;
    try {
      const newUser = await UserService.create(user);
      res.send(newUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateUser: async function (req, res, next) {
    const user = req.body;
    const { id } = req.params;
    try {
      const isUserUpdated = await UserService.updateUser(user, id);
      res.send(
        isUserUpdated[0] === 1
          ? 'User updated successfully'
          : 'Error updating user'
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  deleteUser: async function (req, res, next) {
    const { id } = req.params;
    try {
      const isUserDeleted = await UserService.deleteUser(id);
      res.send(
        isUserDeleted === 1
          ? 'User deleted successfully'
          : ' Error deleting user'
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

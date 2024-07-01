import { UserService } from '../services/index.js';

export const UserController = {
  getAllUsers: async function (req, res, next) {
    try {
      const users = await UserService.getAllUsers(); 
      const allUsersSend = users.map((user) => ({
        id: user.id,
        username: user.username,
        role: user.role,
      }));
      res.send(allUsersSend);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
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
      res.send(
        isUserUpdated[0] === 1
          ? 'User updated successfully'
          : 'Error updating user'
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
      res.send(
        isUserDeleted === 1
          ? 'User deleted successfully'
          : 'Error deleting user'
      );
    } catch (err) {
      next(err);
    }
  },
};

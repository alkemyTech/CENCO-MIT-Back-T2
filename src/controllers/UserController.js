export const UserController = {
  getUser: (req, res) => {
    ///////////Logic here////////////
    res.send('User funcionando');
  },

  getById: (req, res) => {
    ///////////Logic here////////////
    res.send('User por id funcionando');
  },

  createUser: async(req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const newUser = await User.create({ name, email, password, role });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Function to handle user
  updateUser: (req, res) => {
    ///////////Logic here////////////
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`User updated: ${JSON.stringify(updatedUser)} for ID: ${userId}`);
  },

  // Function to handle user deletion
  deleteUser: (req, res) => {
    ///////////Logic here////////////
    const userId = req.params.id;
    res.send(`User deleted with ID: ${userId}`);
  },
};

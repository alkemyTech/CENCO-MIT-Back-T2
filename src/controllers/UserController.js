export const UserController = {
  getUser: (req, res) => {
    ///////////Logic here////////////
    res.send('User funcinando');
  },

  createUser: (req, res) => {
    ///////////Logic here ////////////
    const newUser = req.body;
    res.send(`User created: ${JSON.stringify(newUser)}`);
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

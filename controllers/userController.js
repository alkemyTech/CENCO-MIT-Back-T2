
export const getUser = (req, res) => {
    ///////////Logic here////////////
    res.status(404).send('User not found');
  };
  
  export const createUser = (req, res) => {
    ///////////Logic here ////////////
    const newUser = req.body;
    res.send(`User created: ${JSON.stringify(newUser)}`);
  };
  
  // Function to handle user 
  export const updateUser = (req, res) => {
    ///////////Logic here////////////
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`User updated: ${JSON.stringify(updatedUser)} for ID: ${userId}`);
  };
  
  // Function to handle user deletion
  export const deleteUser = (req, res) => {
    ///////////Logic here////////////
    const userId = req.params.id;
    res.send(`User deleted with ID: ${userId}`);
  };
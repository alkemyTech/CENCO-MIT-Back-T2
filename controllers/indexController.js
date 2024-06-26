export const getIndex = (req, res) => {
    res.send('home page');
  };
  
  export const postIndex = (req, res) => {
    res.send(req.body); // Example 
  };
  
  export const putIndex = (req, res) => {
    res.send({ user: req.query.user, password: req.query.password }); // Example
  };
  
  export const delIndex = (req, res) => {
    res.send({ id: req.params.id }); // Exmample
  };
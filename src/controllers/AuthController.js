import { UserService } from '../services/index.js';

export const AuthController = {
    signup: async function (req, res, next) {
        try {
            const user = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            };
            console.log(user);
            await UserService.create(user);
            next();
        } catch (error) {
            console.error(error);
            next(error);
        }

        res.send({ data: 'User created' });
    },
    login: async function (req, res, next) {
        try {
          const { email, password } = req.body;
          const token = await login(email, password);
          if (!token) res.send({ message: 'Invalid credentials'});
          if (token) {
            res.send({message: 'Login successful', data : { token }});
          }
          next();
        } catch (err) {
          console.error(err);
          next(err);
        }
      }
};
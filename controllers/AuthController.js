import { UserService } from '../services/index.js';


export const AuthController = {
    signup: async function (req, res) {
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
        } catch (error) {
            return res.status(400).json(error);
        }

        res.send({ data: 'User created' });
    }
};
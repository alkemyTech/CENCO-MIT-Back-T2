import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/index.js';

export const UserService = {
    create: async (user) => {
        try {
            const hash = await bcrypt.hash(user.password, parseInt(process.env.SALT));
            user.password = hash;
            await UserRepository.postUser(user);
        } catch (error) {
            console.log(error);
        }
    },
    login: async function (email, password) {
        try {
          const data = await UserService.getByEmail(email);
          const user = data.dataValues;
          if (!user) return null;
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) return null;
          if (isPasswordValid) return jwt.sign({email, role: user.role}, secret, {expiresIn: '15m'});
        } catch (err) {
          console.error(err);
        }
    },
    getByEmail: async (email) => UserRepository.getByEmail(email),
};
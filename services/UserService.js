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
    }
};
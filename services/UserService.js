import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/index.js';

export const UserService = {
    create: async (user) => {
        try {
            bcrypt.hash(user.password, parseInt(process.env.SALT), (err, hash) => {
                user.password = hash;
                UserRepository.postUser(user);
            });
        } catch (error) {
            console.log(error);
        }
    }
};
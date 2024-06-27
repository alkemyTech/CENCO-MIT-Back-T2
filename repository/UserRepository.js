import { User } from '../models/user.js';

export const UserRepository = {
    postUser: async function (user) {
        const userToAdd = User.create(user);
        const newUser = await userToAdd.save();
        return newUser;
    }
};
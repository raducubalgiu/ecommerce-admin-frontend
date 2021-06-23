import {User} from "../../models/userModel";

export const setUser = (user: User) => ({
    type: 'SET_USER',
    user
});
import {User} from "../../models/userModel";

const initialState = {
    user: new User()
}

export const setUserReducer = (state = initialState, action: {type: string, user: User}) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...initialState,
                user: action.user
            }

        default:
            return state;
    }
}
import { FETCH_USERS, CREATE, CREATE_USERS_ERROR, CREATE_USER } from "../actions/types";

export default function(state = null, action) {
    console.log('action: ', action.type);
    console.log('state: ', state);
    switch (action.type) {
        case CREATE_USER:
            return action.payload;
        case FETCH_USERS:
            return action.payload.data;
        case CREATE:
            return action.payload;
        default: return state;
    }
}
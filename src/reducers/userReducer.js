import { FETCH_USER, FETCH_USERS, CREATE, CREATE_USER } from "../actions/types";

export default function(state = null, action) {

    switch (action.type) {
        case CREATE_USER:
            return action.payload;
        case FETCH_USER:
            console.log('action payload no fetch user: ', action.payload.data)
            return action.payload.data;
        case FETCH_USERS:
            return action.payload.data;
        case CREATE:
            return action.payload;
        default: return state;
    }
}
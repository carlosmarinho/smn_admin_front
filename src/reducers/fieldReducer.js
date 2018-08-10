import { FETCH_USER_FIELDS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER_FIELDS:
            console.log('No fetch user fieldsssss: ', action.payload.data)
            return action.payload.data;
        default: return state;
    }
}
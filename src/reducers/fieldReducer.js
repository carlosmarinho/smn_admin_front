import { FETCH_USER_FIELDS } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER_FIELDS:
            return action.payload.data;
        default: return state;
    }
}
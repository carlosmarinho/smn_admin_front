import axios from 'axios';
import { CREATE_USER, CREATE_USERS_ERROR } from "./types";
import { FETCH_USER, FETCH_USERS, FETCH_USER_FIELDS } from "./types";
import { FETCH_LOCATIONS } from "./types";

export async function createUser(values, callback) {
    let request = null;
    let msg = null;
        
    try{
        request = await axios.post("http://localhost:3001/users/", values)
        msg = {"msg_success": request.data}
    }
    catch(err){
        msg = {"error": err.response.data}
    }

    return {
        type: CREATE_USER,
        payload: msg
    }

}

export const fetchUser = (id) => {

    const request = axios.get(`http://localhost:3001/users/${id}`);

    return {
        type: FETCH_USER,
        payload: request
    }
}

export const fetchUsers = () => {
    const request = axios.get("http://localhost:3001/users");

    return {
        type: FETCH_USERS,
        payload: request
    }
}

export const fetchUserFields = () => {

    const request = axios.get("http://localhost:3001/users/fields");

    return {
        type: FETCH_USER_FIELDS,
        payload: request
    }
}

export const fetchLocations = () => {
    console.log("no estado: ");
    const request = axios.get("http://localhost:3001/locations");

    return {
        type: FETCH_LOCATIONS,
        payload: request
    }
}
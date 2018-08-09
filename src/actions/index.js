import axios from 'axios';
import { CREATE, CREATE_USER, CREATE_USERS_ERROR } from "./types";
import { FETCH_USERS, FETCH_USER_FIELDS } from "./types";
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

export const fetchUsers = () => {
    console.log("no estado: ");
    const request = axios.get("http://localhost:3001/users");

    return {
        type: FETCH_USERS,
        payload: request
    }
}

export const fetchUserFields = () => {
    console.log("no estado: ");
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
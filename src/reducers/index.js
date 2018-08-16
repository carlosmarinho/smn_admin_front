import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Users from './userReducer';
import UsersFields from './fieldReducer';
import Locations from './locationReducer';

export default combineReducers({
    users: Users,
    usersFields: UsersFields,
    locations: Locations,
    form: formReducer
})
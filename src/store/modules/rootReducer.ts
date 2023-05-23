import { combineReducers } from '@reduxjs/toolkit';

import userLoggedSlice from './userLogged/userLoggedSlice';
import usersSlice from './users/usersSlice';

const rootReducer = combineReducers({
	userLogged: userLoggedSlice,
	users: usersSlice,
});

export default rootReducer;

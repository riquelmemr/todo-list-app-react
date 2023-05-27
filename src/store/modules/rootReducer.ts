import { combineReducers } from '@reduxjs/toolkit';

import tasksSlice from './tasks/tasksSlice';
import userLoggedSlice from './userLogged/userLoggedSlice';
import usersSlice from './users/usersSlice';

const rootReducer = combineReducers({
	userLogged: userLoggedSlice,
	users: usersSlice,
	tasks: tasksSlice,
});

export default rootReducer;

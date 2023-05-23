import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { User } from '../../../types/user';

const usersAdapter = createEntityAdapter<User>({
	selectId: (user) => user.id,
});

export const { selectAll: findAllUsers } = usersAdapter.getSelectors(
	(state: RootState) => state.users,
);

const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState(),
	reducers: {
		createUser: usersAdapter.addOne,
	},
});

export const { createUser } = usersSlice.actions;
export default usersSlice.reducer;

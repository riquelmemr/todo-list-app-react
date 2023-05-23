import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../..';
import { User } from '../../../types/user';

// Utilização para criar um slice é necessário somente quando o dado for diferente de um Array

// Define the initial state using that type
const initialState: User = {
	id: '',
	email: '',
	password: '',
	isLogged: false,
};

export const userLoggedSlice = createSlice({
	name: 'userLogged',
	initialState,
	reducers: {
		setUserLogged: (state, action: PayloadAction<User>) => {
			sessionStorage.setItem(
				'userLogged',
				JSON.stringify(action.payload.email),
			);

			return {
				id: action.payload.id,
				email: action.payload.email,
				password: action.payload.password,
				isLogged: true,
			};
		},

		removeUserLogged: () => {
			return initialState;
		},
	},
});

export const { setUserLogged, removeUserLogged } = userLoggedSlice.actions;
export const selectUserLogged = (state: RootState) => state.userLogged;
export default userLoggedSlice.reducer;

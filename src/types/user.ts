export interface User {
	id: string;
	email: string;
	password: string;
	isLogged: boolean;
}

export type UserLogged = Omit<User, 'isLogged' | 'id'>;

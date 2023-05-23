import { emailRegex } from '../regex/email';

export const loginValidator = (email: string, password: string) => {
	if (!email || !password) {
		console.log('Email ou senha inválidos');
		return false;
	}

	if (!emailRegex.test(email)) {
		console.log('Email inválido');
		return false;
	}

	if (password.length < 6) {
		console.log('Senha inválida');
		return false;
	}

	return true;
};

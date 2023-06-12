import LoginError from '../../types/error';
import { emailRegex } from '../regex/email';

export const emailValidator = (email: string): LoginError => {
	if (email.length && !emailRegex.test(email)) {
		return {
			helperText: 'Utilize um e-mail válido.',
			valid: false,
		};
	}

	return {
		helperText: '',
		valid: true,
	};
};

export const passwordValidator = (
	password: string,
	confirmPassword = password,
): LoginError => {
	if (password.length && password.length < 6) {
		return {
			helperText: 'Utilize 6 ou mais caracteres.',
			valid: false,
		};
	}

	if (password != confirmPassword) {
		return {
			helperText: 'As senhas não coincidem.',
			valid: false,
		};
	}

	return {
		helperText: '',
		valid: true,
	};
};

export const loginValidator = (email: string, password: string): LoginError => {
	if (!email || !password) {
		return {
			helperText: 'Email ou senha inválidos.',
			valid: false,
		};
	}

	if (password.length < 6) {
		return {
			helperText: 'Utilize 6 ou mais caracteres em sua senha.',
			valid: false,
		};
	}

	return {
		helperText: '',
		valid: true,
	};
};

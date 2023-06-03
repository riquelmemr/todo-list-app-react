import { Box, Grid, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createUser, findAllUsers } from '../../store/modules/users/usersSlice';
import LoginError from '../../types/error';
import { User } from '../../types/user';
import {
	emailValidator,
	loginValidator,
	passwordValidator,
} from '../../utils/validators/inputs';
import FormButton from '../FormButton';
import Logo from '../Logo';
import TextInput from '../TextInput';

const FormRegister: React.FC = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const [emailError, setEmailError] = React.useState<LoginError>({
		helperText: '',
		valid: false,
	});
	const [passwordError, setPasswordError] = React.useState<LoginError>({
		helperText: '',
		valid: false,
	});
	const [confirmPasswordError, setConfirmPasswordError] =
		React.useState<LoginError>({
			helperText: '',
			valid: false,
		});

	const users = useAppSelector(findAllUsers);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.getItem('userLogged')) {
			navigate('/');
		}

		setEmailError(emailValidator(email));
		setPasswordError(passwordValidator(password));
		setConfirmPasswordError(passwordValidator(password, confirmPassword));
	}, [navigate, email, password, confirmPassword]);

	let user: User | undefined;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const valid = loginValidator(email, password);

		if (valid) {
			user = users.find((user) => user.email === email);

			if (user) {
				alert('Usuário já cadastrado!');
				return;
			}

			dispatch(
				createUser({
					id: uuid(),
					email: email,
					password: password,
					isLogged: false,
				}),
			);

			navigate('/login');
		}
	};

	return (
		<Box
			component={'form'}
			action="submit"
			onSubmit={handleSubmit}
			sx={{
				backgroundColor: 'secondary.main',
				borderRadius: '10px',
				width: { xs: '100%', md: '50%' },
				color: 'secondary.contrastText',
			}}
		>
			<Grid
				container
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				rowSpacing={2}
				padding={5}
			>
				<Grid
					item
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Logo />
					<Typography
						variant={'body2'}
						color={'#aaa'}
						textAlign={'center'}
						sx={{
							marginBottom: '12px',
						}}
					>
						Crie sua conta e organize suas tarefas da melhor forma!
					</Typography>
				</Grid>
				<Grid
					item
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
				></Grid>
				<TextInput
					name="email"
					label="Seu e-mail"
					placeholder="john@example.com"
					type="email"
					setState={setEmail}
					state={email}
					error={!emailError.valid}
					helperText={emailError.helperText}
				/>

				<TextInput
					name="password"
					label="Sua senha"
					placeholder="**********"
					type="password"
					setState={setPassword}
					state={password}
					error={!passwordError.valid}
					helperText={passwordError.helperText}
				/>
				<TextInput
					name="confirmPassword"
					label="Confirme sua senha"
					placeholder="**********"
					type="password"
					setState={setConfirmPassword}
					state={confirmPassword}
					error={!confirmPasswordError.valid}
					helperText={confirmPasswordError.helperText}
				/>
				<Grid
					item
					width={'100%'}
					display={'flex'}
					justifyContent={'center'}
					marginBottom={'18px'}
				>
					<Link href={'/login'} sx={{ fontSize: '14px' }}>
						Voltar para a página de login.
					</Link>
				</Grid>
				<Grid item width={'100%'}>
					<FormButton context={'login'} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default FormRegister;

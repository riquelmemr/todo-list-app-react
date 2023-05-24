import { Box, Grid, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserLogged } from '../../store/modules/userLogged/userLoggedSlice';
import { findAllUsers } from '../../store/modules/users/usersSlice';
import LoginError from '../../types/error';
import { User } from '../../types/user';
import { emailValidator, loginValidator } from '../../utils/validators/inputs';
import FormButton from '../FormButton';
import Logo from '../Logo';
import TextInput from '../TextInput';

const FormLogin: React.FC = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState<LoginError>({
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

		setError(emailValidator(email));
	}, [navigate, email]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const valid = loginValidator(email, password);
		let user: User | undefined;

		if (valid) {
			user = users.find((user) => user.email === email);

			if (!user) {
				alert('Usuário não encontrado');
				return;
			}

			if (user.password !== password) {
				alert('Senha incorreta');
				return;
			}

			dispatch(setUserLogged(user));
			navigate('/');
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
						variant={'body1'}
						color={'#aaa'}
						sx={{
							marginBottom: '12px',
						}}
					>
						Realize o login e aproveite!
					</Typography>
				</Grid>
				<TextInput
					name="email"
					label="Seu e-mail"
					placeholder="john@example.com"
					type="email"
					setState={setEmail}
					state={email}
					error={!error.valid}
					helperText={error.helperText}
				/>

				<TextInput
					name="password"
					label="Sua senha"
					placeholder="**********"
					type="password"
					setState={setPassword}
					state={password}
				/>
				<Grid
					item
					width={'100%'}
					display={'flex'}
					justifyContent={'center'}
					marginBottom={'18px'}
				>
					<Typography
						variant={'subtitle1'}
						align={'center'}
						sx={{ fontSize: '14px' }}
					>
						Não possui uma conta?
						<Link href={'/register'}> Cadastre-se.</Link>
					</Typography>
				</Grid>
				<Grid item width={'100%'}>
					<FormButton context={'login'} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default FormLogin;

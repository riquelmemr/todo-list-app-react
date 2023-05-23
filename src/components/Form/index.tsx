import { Box, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Logo from '../../../public/assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserLogged } from '../../store/modules/userLogged/userLoggedSlice';
import { createUser, findAllUsers } from '../../store/modules/users/usersSlice';
import { User } from '../../types/user';
import { loginValidator } from '../../utils/validators/inputs';
import FormButton from '../FormButton';
import TextInput from '../TextInput';

interface FormProps {
	context: string;
}

const Form: React.FC<FormProps> = ({ context }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const users = useAppSelector(findAllUsers);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	let user: User | undefined;
	let valid = false;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		valid = loginValidator(email, password);

		switch (context) {
			case 'login':
				loginUser();
				break;
			case 'register':
				registerUser();
				break;
		}
	};

	const loginUser = () => {
		if (valid) {
			user = users.find((user) => user.email === email);

			if (user && user.email === email && user.password === password) {
				dispatch(
					setUserLogged({
						id: user.id,
						email: user.email,
						password: user.password,
						isLogged: true,
					}),
				);
			}

			navigate('/');
		}
	};

	const registerUser = () => {
		if (valid) {
			user = users.find((user) => user.email === email);
			console.log(user);

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
				<Grid item display={'flex'} justifyContent={'center'}>
					<Box
						component={'img'}
						src={Logo}
						alt="logo"
						sx={{ width: '50%' }}
					/>
				</Grid>
				<Grid
					item
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
				>
					<Typography
						variant={'h4'}
						component={'h1'}
						align={'center'}
						sx={{
							fontWeight: '500',
						}}
					>
						Lista de Recados
					</Typography>
					<Typography
						variant={'body1'}
						color={'#aaa'}
						sx={{
							margin: '8px 0 12px 0',
						}}
					>
						{context == 'register'
							? 'Crie sua conta e organize suas tarefas da melhor forma!'
							: null}
						{context == 'login'
							? 'Realize o login e aproveite!'
							: null}
					</Typography>
				</Grid>
				<TextInput
					name="email"
					label="Seu e-mail"
					placeholder="john@example.com"
					type="email"
					setState={setEmail}
					state={email}
				/>

				<TextInput
					name="password"
					label="Sua senha"
					placeholder="**********"
					type="password"
					setState={setPassword}
					state={password}
				/>
				{context == 'register' ? (
					<TextInput
						name="confirmPassword"
						label="Confirme sua senha"
						placeholder="**********"
						type="password"
						setState={setConfirmPassword}
						state={confirmPassword}
					/>
				) : null}
				<Grid
					item
					width={'100%'}
					display={'flex'}
					justifyContent={'center'}
					marginBottom={'18px'}
				>
					{context == 'register' ? (
						<Link href={'/login'} sx={{ fontSize: '14px' }}>
							Voltar para a página de login.
						</Link>
					) : null}
					{context == 'login' ? (
						<Typography
							variant={'subtitle1'}
							align={'center'}
							sx={{ fontSize: '14px' }}
						>
							Não possui uma conta?
							<Link href={'/register'}> Cadastre-se.</Link>
						</Typography>
					) : null}
				</Grid>
				<Grid item width={'100%'}>
					<FormButton context={context} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Form;

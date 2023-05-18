import { Box, Button, Grid, Link, Typography } from '@mui/material';
import React from 'react';

import Logo from '../../../public/assets/logo.svg';
import TextInput from '../TextInput';

interface FormProps {
	context: string;
}

const Form: React.FC<FormProps> = ({ context }) => {
	return (
		<Box
			component={'form'}
			action="submit"
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
				<Grid item>
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
				<Grid item width={'100%'}>
					<TextInput
						name="email"
						label="Seu e-mail"
						placeholder="john@example.com"
						type="email"
					/>
				</Grid>
				<Grid item width={'100%'}>
					<TextInput
						name="password"
						label="Sua senha"
						placeholder="**********"
						type="password"
					/>
				</Grid>
				{context == 'register' ? (
					<Grid item width={'100%'}>
						<TextInput
							name="confirmPassword"
							label="Confirme sua senha"
							placeholder="**********"
							type="password"
						/>
					</Grid>
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
							<Link href={'/login'}> Cadastre-se.</Link>
						</Typography>
					) : null}
				</Grid>
				<Grid item width={'100%'}>
					<Button
						variant="contained"
						type="submit"
						fullWidth
						sx={{
							padding: '10px',
							textTransform: 'none',
							borderRadius: '8px',
						}}
					>
						{context == 'register' ? 'Criar agora' : 'Entrar'}
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Form;

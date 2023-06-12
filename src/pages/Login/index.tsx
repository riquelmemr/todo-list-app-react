import { Box } from '@mui/material';
import { useEffect } from 'react';

import FormLogin from '../../components/FormLogin';

const Login = () => {
	useEffect(() => {
		if (sessionStorage.getItem('userLogged')) {
			window.location.href = '/';
		}
	}, []);

	return (
		<Box
			component="main"
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '10px',
				backgroundColor: 'secondary.light',
			}}
		>
			<FormLogin />
		</Box>
	);
};

export default Login;

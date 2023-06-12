import { Box } from '@mui/material';
import { useEffect } from 'react';

import FormRegister from '../../components/FormRegister';

const Register = () => {
	useEffect(() => {
		if (sessionStorage.getItem('userLogged')) {
			window.location.href = '/';
		}
	}, []);

	return (
		<Box
			component={'main'}
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '10px',
				backgroundColor: 'secondary.light',
			}}
		>
			<FormRegister />
		</Box>
	);
};

export default Register;

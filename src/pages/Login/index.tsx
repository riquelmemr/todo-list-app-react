import { Box } from '@mui/material';

import FormLogin from '../../components/FormLogin';

const Login = () => {
	return (
		<Box
			component="main"
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '10px',
				backgroundColor: 'secondary.100',
			}}
		>
			<FormLogin />
		</Box>
	);
};

export default Login;

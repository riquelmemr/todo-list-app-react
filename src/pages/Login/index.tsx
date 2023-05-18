import { Box } from '@mui/material';

import Form from '../../components/Form';

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
			<Form context="login" />
		</Box>
	);
};

export default Login;

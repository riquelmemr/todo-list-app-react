import { Box } from '@mui/material';

import Form from '../../components/Form';

const Register = () => {
	return (
		<Box
			component={'main'}
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '10px',
				backgroundColor: 'secondary.100',
			}}
		>
			<Form context="register" />
		</Box>
	);
};

export default Register;

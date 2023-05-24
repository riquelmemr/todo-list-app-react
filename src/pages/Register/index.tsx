import { Box } from '@mui/material';

import FormRegister from '../../components/FormRegister';

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
			<FormRegister />
		</Box>
	);
};

export default Register;

import { Box, Grid } from '@mui/material';
import React from 'react';

interface LoginContainerProps {
	children: React.ReactNode;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginContainer: React.FC<LoginContainerProps> = ({
	children,
	handleSubmit,
}) => {
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
				{children}
			</Grid>
		</Box>
	);
};

export default LoginContainer;

import { Box, Typography } from '@mui/material';

import LogoApp from '../../../public/assets/logo.svg';

const Logo = () => {
	return (
		<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
			<Box
				component={'img'}
				src={LogoApp}
				alt="logo"
				sx={{ width: '50%' }}
			/>
			<Typography
				variant={'h4'}
				component={'h1'}
				align={'center'}
				sx={{
					fontWeight: '500',
					marginTop: '12px',
				}}
			>
				Lista de Recados
			</Typography>
		</Box>
	);
};

export default Logo;

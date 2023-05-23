import { Button } from '@mui/material';
import React from 'react';

interface FormButtonProps {
	context: string;
}

const FormButton: React.FC<FormButtonProps> = ({ context }) => {
	return (
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
	);
};

export default FormButton;

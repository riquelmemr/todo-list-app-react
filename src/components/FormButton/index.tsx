import { Button } from '@mui/material';
import React from 'react';

interface FormButtonProps {
	context: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isDisabled: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
	context,
	setOpen,
	isDisabled,
}) => {
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
			disabled={isDisabled}
			onClick={() => setOpen(true)}
		>
			{context == 'register' ? 'Criar agora' : 'Entrar'}
		</Button>
	);
};

export default FormButton;

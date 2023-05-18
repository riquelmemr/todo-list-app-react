import { Email, Lock } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface TextInputProps {
	name: string;
	type: string;
	label: string;
	placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({
	name,
	type,
	label,
	placeholder,
}) => {
	return (
		<React.Fragment>
			<Box component={'label'} htmlFor={name} sx={{ fontWeight: '500' }}>
				{label}
			</Box>
			<TextField
				type={type}
				name={name}
				variant="standard"
				placeholder={placeholder}
				InputProps={{
					disableUnderline: true,
					startAdornment: (
						<InputAdornment position="start">
							{type == 'email' ? (
								<Email
									color="primary"
									fontSize="small"
									sx={{ marginRight: '8px' }}
								/>
							) : null}
							{type == 'password' ? (
								<Lock
									color="primary"
									fontSize="small"
									sx={{ marginRight: '8px' }}
								/>
							) : null}
						</InputAdornment>
					),
					style: {
						color: '#aaa',
						fontSize: '14px',
					},
				}}
				sx={{
					backgroundColor: 'secondary.100',
					borderRadius: '8px',
					border: 'none',
					padding: '8px 14px',
					marginTop: '4px',
				}}
				fullWidth
			/>
		</React.Fragment>
	);
};

export default TextInput;

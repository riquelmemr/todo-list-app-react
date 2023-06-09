import { Email, Lock } from '@mui/icons-material';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface TextInputProps {
	name: string;
	type: string;
	label: string;
	placeholder: string;
	state: string;
	helperText?: string;
	error?: boolean;
	setState: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput: React.FC<TextInputProps> = ({
	name,
	type,
	label,
	placeholder,
	helperText,
	error,
	state,
	setState,
}) => {
	return (
		<Grid item width={'100%'}>
			<Box component={'label'} htmlFor={name} sx={{ fontWeight: '500' }}>
				{label}
			</Box>
			<TextField
				error={error}
				helperText={helperText}
				type={type}
				name={name}
				variant="standard"
				placeholder={placeholder}
				value={state}
				onChange={(e) => setState(e.target.value)}
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
					backgroundColor: 'secondary.light',
					borderRadius: '8px',
					border: 'none',
					padding: '8px 14px',
					marginTop: '4px',
				}}
				fullWidth
			/>
		</Grid>
	);
};

export default TextInput;

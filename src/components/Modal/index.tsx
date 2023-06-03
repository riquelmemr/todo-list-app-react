import { ThemeProvider } from '@emotion/react';
import { Box, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import { theme } from '../../configs/themes';

interface ModalProps {
	context: 'create' | 'edit' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ context, open, setOpen }) => {
	return (
		<ThemeProvider theme={theme}>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				sx={{
					'& .MuiPaper-root': {
						backgroundColor: theme.palette.secondary.light,
					},
				}}
			>
				<DialogTitle id="alert-dialog-title" color={'primary'}>
					{context === 'create'
						? 'Crie sua tarefa'
						: context === 'edit'
						? 'Edite sua tarefa'
						: 'Tem certeza que deseja excluir esta tarefa?'}
				</DialogTitle>
				<DialogContent>
					{context !== 'delete' && (
						<Grid container spacing={2} padding={2}>
							<Grid item xs={12}>
								<Box
									component={'label'}
									sx={{
										fontSize: '14px',
										fontWeight: '500',
										color: theme.palette.primary.main,
									}}
								>
									Título
								</Box>
								<TextField
									fullWidth
									multiline
									InputProps={{
										disableUnderline: true,
									}}
									sx={{
										borderRadius: '8px',
										backgroundColor: '#43474a',
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<Box
									component={'label'}
									sx={{
										fontSize: '14px',
										fontWeight: '500',
										color: theme.palette.primary.main,
									}}
								>
									Descrição
								</Box>
								<TextField
									fullWidth
									multiline
									sx={{
										borderRadius: '8px',
										backgroundColor: '#43474a',
									}}
								/>
							</Grid>
						</Grid>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={() => setOpen(false)}
						sx={{ bgcolor: 'theme.palette.primary.dark' }}
					>
						{context === 'create' || context === 'edit'
							? 'Cancelar'
							: 'Não'}
					</Button>
					<Button variant="contained" onClick={() => setOpen(false)}>
						{context === 'create'
							? 'Criar'
							: context === 'edit'
							? 'Editar'
							: 'Sim'}
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	);
};

export default Modal;

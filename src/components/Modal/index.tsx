import { ThemeProvider } from '@emotion/react';
import { Box, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { theme } from '../../configs/themes';
import { useAppDispatch } from '../../store/hooks';
import {
	addTask,
	removeTask,
	updateTask,
} from '../../store/modules/tasks/tasksSlice';
import Task from '../../types/task';

interface ModalProps {
	task?: Task;
	context: 'create' | 'update' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ context, open, setOpen, task }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = () => {
		setOpen(false);

		switch (context) {
			case 'create':
				dispatch(
					addTask({
						id: uuid(),
						title,
						description,
						completed: false,
						createdAt: new Date().toLocaleDateString('pt-BR'),
						createdBy:
							sessionStorage.getItem('userLogged') ||
							'Usuário não enocontado na sessão',
						isDeleted: false,
					}),
				);
				break;

			case 'update':
				if (task) {
					dispatch(
						updateTask({
							id: task.id,
							changes: {
								title,
								description,
							},
						}),
					);
				}

				break;

			case 'delete':
				if (task) {
					if (task.isDeleted) dispatch(removeTask(task.id));

					dispatch(
						updateTask({
							id: task.id,
							changes: {
								isDeleted: true,
							},
						}),
					);
				}
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				sx={{
					'& .MuiPaper-root': {
						borderRadius: '12px',
						backgroundColor: theme.palette.secondary.light,
					},
				}}
			>
				<DialogTitle id="alert-dialog-title" color={'primary'}>
					{context === 'create'
						? 'Crie sua tarefa'
						: context === 'update'
						? 'Edite sua tarefa'
						: 'Tem certeza que deseja excluir esta tarefa?'}
				</DialogTitle>

				{context !== 'delete' && (
					<DialogContent>
						<Grid container spacing={2}>
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
									onChange={(e) => setTitle(e.target.value)}
									InputProps={{
										disableUnderline: true,
										style: {
											color: '#aaa',
											fontSize: '14px',
										},
									}}
									sx={{
										borderRadius: '6px',
										backgroundColor: '#43474a',
										border: 'none',
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
									onChange={(e) =>
										setDescription(e.target.value)
									}
									InputProps={{
										disableUnderline: true,
										style: {
											color: '#aaa',
											fontSize: '14px',
										},
									}}
									sx={{
										border: 'none',
										borderRadius: '6px',
										backgroundColor: '#43474a',
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
				)}
				<DialogActions>
					<Button
						variant="contained"
						onClick={() => setOpen(false)}
						sx={{ bgcolor: 'theme.palette.primary.dark' }}
					>
						{context === 'create' || context === 'update'
							? 'Cancelar'
							: 'Não'}
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							setOpen(false);
							handleSubmit();
						}}
					>
						{context === 'create'
							? 'Criar'
							: context === 'update'
							? 'Editar'
							: 'Sim'}
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	);
};

export default Modal;

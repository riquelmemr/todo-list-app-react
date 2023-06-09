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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	addTask,
	removeTask,
	updateTask,
} from '../../store/modules/tasks/tasksSlice';
import { selectUserLogged } from '../../store/modules/userLogged/userLoggedSlice';
import Task from '../../types/task';
import SnackBarMessage from '../SnackBarMessage';

interface ModalProps {
	task?: Task;
	context: 'create' | 'update' | 'delete' | 'restore';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ context, open, setOpen, task }) => {
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState(task?.title || '');
	const [description, setDescription] = useState(task?.description || '');

	const dispatch = useAppDispatch();
	const userLogged = useAppSelector(selectUserLogged).email;

	const handleSubmit = () => {
		switch (context) {
			case 'create':
				if (!title || !description) {
					setOpenSnackBar(true);
					setMessage('Preencha todos os campos');
					return;
				}

				dispatch(
					addTask({
						id: uuid(),
						title,
						description,
						completed: false,
						createdAt: new Date().toLocaleDateString('pt-BR'),
						createdBy: userLogged,
						isDeleted: false,
					}),
				);
				break;

			case 'update':
				if (!title || !description) {
					setOpenSnackBar(true);
					setMessage('Preencha todos os campos');
					return;
				}

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

				break;

			case 'restore':
				if (task) {
					dispatch(
						updateTask({
							id: task.id,
							changes: {
								isDeleted: false,
							},
						}),
					);
				}

				break;
		}

		setOpen(false);
		setTitle('');
		setDescription('');
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
				<DialogTitle id="alert-dialog-title" color={'#fff'}>
					{context === 'create'
						? 'Crie sua tarefa'
						: context === 'update'
						? 'Edite sua tarefa'
						: context === 'delete'
						? 'Deseja excluir essa tarefa?'
						: 'Deseja restaurar essa tarefa?'}
				</DialogTitle>

				{context !== 'delete' && context !== 'restore' && (
					<DialogContent>
						<SnackBarMessage
							mode="error"
							open={openSnackBar}
							handleClose={() => setOpenSnackBar(false)}
							message={message}
						/>
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
									variant="standard"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									InputProps={{
										disableUnderline: true,
										style: {
											color: '#aaa',
											fontSize: '14px',
										},
									}}
									sx={{
										padding: '12px',
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
									variant="standard"
									value={description}
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
										padding: '12px',
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

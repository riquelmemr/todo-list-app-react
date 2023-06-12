import { ThemeProvider } from '@emotion/react';
import { CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { theme } from '../../configs/themes';
import { useAppDispatch } from '../../store/hooks';
import { updateTask } from '../../store/modules/tasks/tasksSlice';
import Task from '../../types/task';
import Modal from '../Modal';

interface TaskCardProps {
	task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const [open, setOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isRestore, setIsRestore] = useState(false);

	const dispath = useAppDispatch();

	const handleFavorite = () => {
		dispath(
			updateTask({
				id: task.id,
				changes: {
					completed: !task.completed,
				},
			}),
		);
	};

	return (
		<ThemeProvider theme={theme}>
			<Card
				sx={{
					width: '100%',
					backgroundColor: task.completed
						? '#181818'
						: theme.palette.secondary.main,
					color: theme.palette.secondary.contrastText,
					borderRadius: '8px',
				}}
			>
				<CardContent>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography gutterBottom variant="h6" component="h3">
							{task.title}
						</Typography>
					</Box>

					<Typography variant="body2" color={'#bbb'}>
						{task.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '16px',
					}}
				>
					{task.isDeleted && (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								size="small"
								variant="contained"
								onClick={() => {
									setIsRestore(true);
									setIsDelete(false);
									setIsUpdate(false);
									setOpen(true);
								}}
							>
								Restaurar
							</Button>
							<Button
								size="small"
								variant="contained"
								sx={{
									bgcolor: '#c93f3f',
									'&:hover': { bgcolor: '#921212' },
								}}
								onClick={() => {
									setOpen(true);
									setIsDelete(true);
									setIsRestore(false);
									setIsUpdate(false);
								}}
							>
								Excluir
							</Button>
						</Box>
					)}
					{!task.completed && !task.isDeleted (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								size="small"
								variant="contained"
								onClick={() => {
									setIsUpdate(true);
									setIsDelete(false);
									setIsRestore(false);
									setOpen(true);
								}}
							>
								Editar
							</Button>
							<Button
								size="small"
								variant="contained"
								sx={{
									bgcolor: '#c93f3f',
									'&:hover': { bgcolor: '#921212' },
								}}
								onClick={() => {
									setOpen(true);
									setIsDelete(true);
								}}
							>
								Excluir
							</Button>
						</Box>
					)}
					{task.completed && !task.isDeleted (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								size="small"
								variant="contained"
								sx={{
									bgcolor: '#c93f3f',
									'&:hover': { bgcolor: '#921212' },
								}}
								onClick={() => {
									setOpen(true);
									setIsDelete(true);
								}}
							>
								Excluir
							</Button>
						</Box>
					)}
					<Typography variant="body2" component="div">
						{task.createdAt}
					</Typography>
					{!task.isDeleted && (
						<IconButton color="primary" onClick={handleFavorite}>
							{task.completed ? (
								<CheckCircle />
							) : (
								<CheckCircleOutline />
							)}
						</IconButton>
					)}
				</CardActions>
			</Card>

			<Modal
				task={task}
				context={isDelete ? 'delete' : isUpdate ? 'update' : 'restore'}
				open={open}
				setOpen={setOpen}
			/>
		</ThemeProvider>
	);
};

export default TaskCard;

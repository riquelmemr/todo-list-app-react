import { ThemeProvider } from '@emotion/react';
import { CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';

import { theme } from '../../configs/themes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { findAllTasks, updateTask } from '../../store/modules/tasks/tasksSlice';
import Task from '../../types/task';
import Modal from '../Modal';

interface TaskCardProps {
	task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const [open, setOpen] = React.useState(false);
	const [isUpdate, setIsUpdate] = React.useState(false);
	const [isDelete, setIsDelete] = React.useState(false);

	const dispath = useAppDispatch();
	const tasks = useAppSelector(findAllTasks);

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
						? '#003e5f'
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
						<Typography variant="body2" component="div">
							{task.createdAt}
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
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							size="small"
							variant="contained"
							onClick={() => {
								setIsUpdate(true);
								setOpen(true);
							}}
						>
							Editar
						</Button>
						<Button
							size="small"
							variant="contained"
							onClick={() => {
								setOpen(true);
								setIsDelete(true);
							}}
						>
							Excluir
						</Button>
					</Box>

					<IconButton color="primary" onClick={handleFavorite}>
						{task.completed ? (
							<CheckCircle />
						) : (
							<CheckCircleOutline />
						)}
					</IconButton>
				</CardActions>
			</Card>

			<Modal
				task={task}
				context={isDelete ? 'delete' : 'update'}
				open={open}
				setOpen={setOpen}
			/>
		</ThemeProvider>
	);
};

export default TaskCard;

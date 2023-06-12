import { Add } from '@mui/icons-material';
import { Fab, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';
import Modal from '../../components/Modal';
import TaskCard from '../../components/TaskCard';
import { useAppSelector } from '../../store/hooks';
import { findAllTasks } from '../../store/modules/tasks/tasksSlice';
import { selectUserLogged } from '../../store/modules/userLogged/userLoggedSlice';

const Home = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const userLogged = useAppSelector(selectUserLogged).email;

	const tasks = useAppSelector(findAllTasks);

	useEffect(() => {
		if (!sessionStorage.getItem('userLogged')) {
			navigate('/login');
		}
	});

	return (
		<div>
			<MiniDrawer titlePage="Tarefas">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography
							variant="h6"
							color={'#e9e9e9'}
							fontWeight={'500'}
						>
							Crie e edite aqui suas tarefas:
						</Typography>
					</Grid>
					{tasks
						.filter((task) => {
							return (
								!task.isDeleted && task.createdBy === userLogged
							);
						})
						.map((task) => (
							<Grid item key={task.id} xs={12} sm={6} md={4}>
								<TaskCard task={task} />
							</Grid>
						))}
				</Grid>
				<Fab
					color="primary"
					aria-label="add"
					sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
				>
					<Add onClick={() => setOpen(true)} />
				</Fab>
			</MiniDrawer>

			<Modal context="create" open={open} setOpen={setOpen} />
		</div>
	);
};

export default Home;

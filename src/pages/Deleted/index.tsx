import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';
import TaskCard from '../../components/TaskCard';
import { useAppSelector } from '../../store/hooks';
import { findAllTasks } from '../../store/modules/tasks/tasksSlice';

const Deleted = () => {
	const navigate = useNavigate();
	const tasks = useAppSelector(findAllTasks);

	useEffect(() => {
		if (!sessionStorage.getItem('userLogged')) {
			navigate('/login');
		}
	});

	return (
		<div>
			<MiniDrawer titlePage={'Deletadas'}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography
							variant="h5"
							color={'#fff'}
							fontWeight={'500'}
						>
							Visualize aqui suas tarefas excluídas:
						</Typography>
					</Grid>
					{tasks
						.filter((task) => {
							return (
								task.isDeleted &&
								task.createdBy ===
									sessionStorage.getItem('userLogged')
							);
						})
						.map((task) => (
							<Grid item key={task.id} xs={12} sm={6} md={4}>
								<TaskCard task={task} />
							</Grid>
						))}
				</Grid>
			</MiniDrawer>
		</div>
	);
};

export default Deleted;

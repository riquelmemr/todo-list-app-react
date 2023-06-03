import { Add } from '@mui/icons-material';
import { Fab, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';
import Modal from '../../components/Modal';
import TaskCard from '../../components/TaskCard';
import Task from '../../types/task';

const mockTasks: Task[] = [
	{
		id: '1',
		title: 'Tarefa 1',
		description: 'Descrição da tarefa',
		createdAt: new Date().toLocaleDateString('pt-BR'),
		createdBy: 'Usuário 1',
		completed: false,
		isDeleted: false,
	},
	{
		id: '2',
		title: 'Tarefa 2',
		description: 'Descrição da tarefa',
		createdAt: new Date().toLocaleDateString('pt-BR'),
		createdBy: 'Usuário 2',
		completed: false,
		isDeleted: false,
	},
	{
		id: '3',
		title: 'Descrição da tarefa sadasdasdasd',
		description: 'Descrição da tarefa grande',
		createdAt: new Date().toLocaleDateString('pt-BR'),
		createdBy: 'Usuário 3',
		completed: true,
		isDeleted: false,
	},
];

const Home = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!sessionStorage.getItem('userLogged')) {
			navigate('/login');
		}
	});

	return (
		<div>
			<MiniDrawer titlePage="Tarefas">
				<Grid container spacing={2}>
					{mockTasks.map((task) => (
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

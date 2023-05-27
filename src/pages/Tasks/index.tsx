import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';
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
	},
	{
		id: '2',
		title: 'Tarefa 2',
		description: 'Descrição da tarefa',
		createdAt: new Date().toLocaleDateString('pt-BR'),
		createdBy: 'Usuário 2',
		completed: false,
	},
	{
		id: '3',
		title: 'Tarefa 3',
		description: 'Descrição da tarefa',
		createdAt: new Date().toLocaleDateString('pt-BR'),
		createdBy: 'Usuário 3',
		completed: false,
	},
];

const Tasks = () => {
	const navigate = useNavigate();

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
			</MiniDrawer>
		</div>
	);
};

export default Tasks;

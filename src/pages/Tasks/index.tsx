import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';

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
				<h1>Minhas Tarefas</h1>
			</MiniDrawer>
		</div>
	);
};

export default Tasks;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';

const Finished = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!sessionStorage.getItem('userLogged')) {
			navigate('/login');
		}
	});

	return (
		<div>
			<MiniDrawer titlePage={'Concluídas'}>
				<h1>Concluídas</h1>
			</MiniDrawer>
		</div>
	);
};

export default Finished;

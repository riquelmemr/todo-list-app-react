import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';

const Deleted = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!sessionStorage.getItem('userLogged')) {
			navigate('/login');
		}
	});

	return (
		<div>
			<MiniDrawer titlePage={'Deletadas'}>
				<h1>Deletadas</h1>
			</MiniDrawer>
		</div>
	);
};

export default Deleted;

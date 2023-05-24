import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MiniDrawer from '../../components/Drawer';

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!sessionStorage.getItem('userLogged')) {
			navigate('/login');
		}
	});

	return (
		<div>
			<MiniDrawer titlePage={'Página Inicial'}>
				<h1>Home</h1>
			</MiniDrawer>
		</div>
	);
};

export default Home;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Deleted from '../../pages/Deleted';
import Finished from '../../pages/Finished';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Home />} />
				<Route path="/tasks/finished" element={<Finished />} />
				<Route path="/tasks/deleted" element={<Deleted />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;

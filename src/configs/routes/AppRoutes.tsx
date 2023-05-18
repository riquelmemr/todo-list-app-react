import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../../pages/Login';
import Posts from '../../pages/Posts';
import Register from '../../pages/Register';
import Welcome from '../../pages/Welcome';

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;

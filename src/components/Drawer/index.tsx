import {
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Delete,
	ExitToApp,
	Home,
	Menu,
} from '@mui/icons-material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

import { useAppDispatch } from '../../store/hooks';
import { removeUserLogged } from '../../store/modules/userLogged/userLoggedSlice';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
	'.MuiPaper-elevation': {
		backgroundColor: theme.palette.primary.main,
	},
}));

const navItems = [
	{
		text: 'Página Inicial',
		href: '/',
		icon: <Home sx={{ color: '#fff' }} />,
	},
	{
		text: 'Concluídas',
		href: '/tasks/finished',
		icon: <CheckCircle sx={{ color: '#fff' }} />,
	},
];

const secondNavItems = [
	{
		text: 'Deletadas',
		href: '/tasks/deleted',
		icon: <Delete sx={{ color: '#fff' }} />,
	},
	{
		text: 'Sair',
		href: '/login',
		icon: <ExitToApp sx={{ color: '#fff' }} />,
	},
];

interface MiniDrawerProps {
	children: React.ReactNode;
	titlePage: string;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ children, titlePage }) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const dispatch = useAppDispatch();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		sessionStorage.removeItem('userLogged');
		dispatch(removeUserLogged());
	};

	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			<CssBaseline />
			<AppBar
				position="fixed"
				open={open}
				sx={{ backgroundColor: theme.palette.primary.main }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<Menu />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						{titlePage}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRight sx={{ color: '#fff' }} />
						) : (
							<ChevronLeft sx={{ color: '#fff' }} />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{navItems.map((item) => (
						<ListItem
							key={item.text}
							disablePadding
							sx={{ display: 'block' }}
						>
							<ListItemButton
								href={item.href}
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.text}
									sx={{
										opacity: open ? 1 : 0,
										color: '#fff',
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{[
						secondNavItems.map((item) => (
							<ListItem
								key={item.text}
								disablePadding
								sx={{ display: 'block' }}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open
											? 'initial'
											: 'center',
										px: 2.5,
									}}
									onClick={() => {
										item.text === 'Sair' && handleLogout();
									}}
									href={item.href}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.text}
										sx={{
											opacity: open ? 1 : 0,
											color: '#fff',
										}}
									/>
								</ListItemButton>
							</ListItem>
						)),
					]}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					backgroundColor: theme.palette.secondary.light,
					height: '100vh',
				}}
			>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	);
};

export default MiniDrawer;

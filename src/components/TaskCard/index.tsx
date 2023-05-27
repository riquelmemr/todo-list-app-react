import { ThemeProvider } from '@emotion/react';
import { CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';

import { theme } from '../../configs/themes';
import Task from '../../types/task';

interface TaskCardProps {
	task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	return (
		<ThemeProvider theme={theme}>
			<Card
				sx={{
					width: '100%',
					backgroundColor: theme.palette.secondary.main,
					color: theme.palette.secondary.contrastText,
					borderRadius: '8px',
				}}
			>
				<CardContent>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography gutterBottom variant="h6" component="h3">
							{task.title}
						</Typography>
						<Typography variant="body2" component="div">
							{task.createdAt}
						</Typography>
					</Box>

					<Typography variant="body2" color={'#bbb'}>
						{task.description}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '16px',
					}}
				>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button size="small" variant="contained">
							Editar
						</Button>
						<Button size="small" variant="contained">
							Excluir
						</Button>
					</Box>

					<IconButton color="primary">
						{task.completed ? (
							<CheckCircle />
						) : (
							<CheckCircleOutline />
						)}
					</IconButton>
				</CardActions>
			</Card>
		</ThemeProvider>
	);
};

export default TaskCard;

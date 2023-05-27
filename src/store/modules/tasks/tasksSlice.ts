import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import Task from '../../../types/task';

const tasksAdapter = createEntityAdapter<Task>({
	selectId: (task) => task.id,
});

export const { selectAll: findAllTasks } = tasksAdapter.getSelectors(
	(state: RootState) => state.tasks,
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: tasksAdapter.getInitialState(),
	reducers: {
		addTask: tasksAdapter.addOne,
		removeTask: tasksAdapter.removeOne,
		updateTask: tasksAdapter.updateOne,
	},
});

export const { addTask, removeTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;

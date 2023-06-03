interface Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
	createdBy: string;
	isDeleted: boolean;
}

export default Task;

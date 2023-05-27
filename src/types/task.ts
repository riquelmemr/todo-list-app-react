interface Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
	createdBy: string;
	deletedAt?: Date;
}

export default Task;

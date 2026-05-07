export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  projectId: number;
  assignedToEmail: string;
  projectName?: string;
}

export interface CreateTaskModel {
  title: string;
  description: string;
  projectId: number;
  assignedToEmail: string;
  priority: string;
  deadline: string;
}

export interface UpdateStatusModel {
  status: string;
}

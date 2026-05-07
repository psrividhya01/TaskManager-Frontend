import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCommentModel, Comment } from '../model/comment.model';
import { Task, UpdateStatusModel } from '../model/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  private apiUrl = environment.apiUrl + '/developer';

  constructor(private http: HttpClient) {}

  // Get my tasks
  getMyTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}/my-tasks`);
  }

  // Get task by id with comments
  getTaskById(id: number) {
    return this.http.get(`${this.apiUrl}/my-tasks/${id}`);
  }

  // Update task status
  updateStatus(id: number, model: UpdateStatusModel) {
    return this.http.patch(`${this.apiUrl}/my-tasks/${id}/status`, model);
  }

  // Add comment
  addComment(taskId: number, model: CreateCommentModel) {
    return this.http.post(`${this.apiUrl}/my-tasks/${taskId}/comments`, model);
  }

  // Get comments
  getComments(taskId: number) {
    return this.http.get<Comment[]>(`${this.apiUrl}/my-tasks/${taskId}/comments`);
  }
}

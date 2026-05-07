import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../service/task-service';
import { ProjectService } from '../../service/project-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTaskComponent implements OnInit {
  title = '';
  description = '';
  projectId = 0;
  assignedToEmail = '';
  priority = 'MEDIUM';
  deadline = '';
  projects: any[] = [];
  developers: any[] = [];
  errorMessage = '';
  loading = false;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadProjects();
    this.loadDevelopers();
    
    // Set default deadline to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.deadline = tomorrow.toISOString().slice(0, 16);
  }

  loadProjects() {
    this.projectService.getAll().subscribe({
      next: (res) => {
        this.projects = [...res];
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load projects';
        this.cdr.detectChanges();
      },
    });
  }

  loadDevelopers() {
    this.taskService.getDevelopers().subscribe({
      next: (res) => {
        this.developers = [...res];
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load developers';
        this.cdr.detectChanges();
      },
    });
  }

  create() {
    if (!this.title || !this.description || !this.projectId || !this.assignedToEmail || !this.priority || !this.deadline) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.taskService
      .create({
        title: this.title,
        description: this.description,
        projectId: this.projectId,
        assignedToEmail: this.assignedToEmail,
        priority: this.priority,
        deadline: this.deadline
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/manager/tasks']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Failed to create task. ' + (err.error?.message || 'Try again.');
          this.cdr.detectChanges();
        },
      });
  }
}

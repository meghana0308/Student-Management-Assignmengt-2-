import { Component , signal  } from '@angular/core';
import { Student } from '../../services/student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-students',
  imports: [CommonModule , FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {
    students = signal<any[]>([]);
  selectedStudent = signal<any>({ name: '', class: '', section: '' });
  message = signal('');

  constructor(private service: Student) {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe(data => this.students.set(data));
  }

  selectStudent(student: any) {
    this.selectedStudent.set({ ...student });
  }

  saveStudent() {
    const student = this.selectedStudent();
    if (!student) return;

    if (student.id) {
      this.service.updateStudent(student).subscribe({
        next: () => {
          this.message.set('Student updated');
          this.loadStudents();
          this.selectedStudent.set({ name: '', class: '', section: '' });
        },
        error: () => this.message.set('Update failed'),
      });
    } else {
      this.service.addStudent(student).subscribe({
        next: () => {
          this.message.set('Student added');
          this.loadStudents();
          this.selectedStudent.set({ name: '', class: '', section: '' });
        },
        error: () => this.message.set('Add failed'),
      });
    }
  }

  deleteStudent(id: number) {
    if (!confirm('Are you sure?')) return;
    this.service.deleteStudent(id).subscribe({
      next: () => {
        this.message.set('Student deleted');
        this.loadStudents();
      },
      error: () => this.message.set('Delete failed'),
    });
  }
}

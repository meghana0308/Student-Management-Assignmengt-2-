import { Component , signal} from '@angular/core';
import { Student } from '../../services/student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = signal('');
  password = signal('');
  error = signal('');

  constructor(private service: Student, private router: Router) {}

  login() {
    this.service.login(this.email(), this.password()).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/students']);
      },
      error: () => {
        this.error.set('Invalid credentials');
      }
    });
  }
}

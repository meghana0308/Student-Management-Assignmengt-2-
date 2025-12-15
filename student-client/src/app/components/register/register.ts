import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../services/student';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = signal('');
  password = signal('');
  message = signal('');

  constructor(private service: Student, private router: Router) {}

register() {
  this.service.register(this.email(), this.password()).subscribe({
    next: (res) => {
      console.log('Backend response:', res); // debug
      if (res) {
        this.message.set('Registration successful');
        this.router.navigate(['/login']);
      } else {
        this.message.set('Registration failed');
      }
    },
    error: (err) => {
      console.log('Backend error:', err);
      if (err.error && Array.isArray(err.error) && err.error[0]?.description) {
        this.message.set(err.error[0].description);
      } else {
        this.message.set('Registration failed');
      }
    }
  });
}

}

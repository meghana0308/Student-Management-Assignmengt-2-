import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Student {
  private apiUrl = 'http://localhost:5042/api/students';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
  return this.http.post(
    'http://localhost:5042/api/auth/register',
    { email, password },
    { responseType: 'text' }  // <-- add this
  );
}


  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:5042/api/auth/login', {
      email, password
    });
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getAuthHeaders());
  }

  addStudent(student: any) {
  return this.http.post(this.apiUrl, student, this.getAuthHeaders());
}

updateStudent(student: any) {
  return this.http.put(`${this.apiUrl}/${student.id}`, student, this.getAuthHeaders());
}

deleteStudent(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
}

}

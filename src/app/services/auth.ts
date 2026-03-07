/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginResponse,Rol } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { usuario, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario() {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  getRol(): Rol | null {
    return this.getUsuario()?.roles ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRol() === 'admin';
  }

  isUser(): boolean {
    return this.getRol() === 'user';
  }
  isAuthenticated(): boolean {
  return !!this.getToken();
}
}
/*import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
*/
/*
// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone:false,
   templateUrl: './login.html',
  styleUrls: ['./login.css' ],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    try {
      this.authService.login(this.username, this.password).subscribe({
        next: (user) => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.message || 'Error al iniciar sesión';
        }
      });
    } catch (error: any) {
      this.loading = false;
      this.errorMessage = error.message || 'Error al iniciar sesión';
    }
  }
}
*/
/*
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AlertService } from '../../services/alert';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'], // CORREGIDO
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert:AlertService
  ) {}

  onSubmit(): void {
    /*if (!this.username || !this.password) {
      this.errorMessage = 'Ingrese usuario y contraseña';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        this.router.navigate(['/dashboard']); // Redirección correcta
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.message || 'Error al iniciar sesión';
      }
    });
  }*


    // 🔴 Validación básica
    if (!this.username || !this.password) {
      this.alert.warning(
        'Datos incompletos',
        'Ingrese usuario y contraseña'
      );
      return;
    }

    this.loading = true;

    // 🔵 Login con backend
    this.authService.login(this.username, this.password).subscribe({

      // ✅ LOGIN CORRECTO
      next: () => {
        this.loading = false;

        this.alert.success('Bienvenido 👋');

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      },

      // ❌ ERROR LOGIN
      error: (error) => {
        this.loading = false;

        this.alert.error(
          'Error al iniciar sesión',
          error?.message || 'Usuario o contraseña incorrectos'
        );
      }
    });
  }
}*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false
})
export class LoginComponent {

  usuario: string = '';
  password: string = '';
  errorMsg: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.usuario || !this.password) {
      this.errorMsg = 'Por favor completa todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.login(this.usuario, this.password).subscribe({
      next: () => {
        this.loading = false;
        // ✅ Siempre redirige al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}
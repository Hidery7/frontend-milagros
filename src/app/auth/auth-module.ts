/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';



@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
*/
// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { LoginComponent } from './login/login.component';
import { LoginComponent } from './login/login';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [ 
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
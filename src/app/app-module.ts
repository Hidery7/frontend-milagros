/*import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginComponent } from './auth/login/login';
import { AuthModule } from './auth/auth-module';
import { DashboardModule } from './dashboard/dashboard-module';
import { HttpClientModule } from '@angular/common/http';
//import { AppComponent } from './app-routing-module';
@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //AuthModule,
    //Agregar para mostrar los datos completos e icons y reiniciar angular :ng serve
    //si no se usa standalone, todo se arregla en los modulos.
    DashboardModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
*///
/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // ✅ AGREGAR ESTO
import { AppRoutingModule } from './app-routing-module';
import {  AppComponent } from './app';
import { DashboardModule } from './dashboard/dashboard-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    // ...tus componentes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,  // ✅ AGREGAR ESTO
    DashboardModule
  ],
 providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
  bootstrap: [AppComponent]
})
export class AppModule { }*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { DashboardModule } from './dashboard/dashboard-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    DashboardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { MainComponent } from './dashboard/main/main';
//import { AuthGuard } from './guards/auth.guard';
import { AuthGuard } from './guards/auth-guard';
import { ProveedoresComponent } from './dashboard/proveedores/proveedores';
import { ProductosComponent } from './dashboard/productos/productos';
import { InventariadoComponent } from './dashboard/inventariado/inventariado';
import { PersonalComponent } from './dashboard/personal/personal';
import { CategoriaComponent } from './dashboard/categoria/categoria';
import { UsuariosComponent } from './dashboard/usuarios/usuarios';
import { RoleGuard } from './guards/roles-guard';
import { DashboardModule } from './dashboard/dashboard-module';

const routes: Routes = [
  //definir las rutas para cada módulo
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] },
  //{ path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'inventariado', component: InventariadoComponent, canActivate: [AuthGuard] },
  { path: 'personal', component: PersonalComponent, canActivate: [AuthGuard] },
  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },


  //SOLO ADMIN
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'productos', component: ProductosComponent, canActivateChild: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },

  //ADMIN Y USER
  { path: 'Dashboard', component: DashboardModule, canActivate: [AuthGuard], },
  { path: 'inventariado', component: InventariadoComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin', 'user'] } },

  //{ path: 'sin-permiso', component: SinPermisoComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// src/app/app.component.ts
/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [],
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'sistema-inventario';
}*/
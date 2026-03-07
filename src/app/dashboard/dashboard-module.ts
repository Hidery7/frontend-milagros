/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Main } from './main/main';
import { Proveedores } from './proveedores/proveedores';
import { Productos } from './productos/productos';
import { Personal } from './personal/personal';
import { Inventariado } from './inventariado/inventariado';
import { Categoria } from './categoria/categoria';



@NgModule({
  declarations: [
    Main,
    Proveedores,
    Productos,
    Personal,
    Inventariado,
    Categoria
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
*/
// src/app/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // ✅ AGREGAR ESTO

import { MainComponent } from './main/main';
import { ProveedoresComponent } from './proveedores/proveedores';
import { PersonalComponent } from './personal/personal';
import { CategoriaComponent } from './categoria/categoria';
import { ProductosComponent } from './productos/productos';
import { InventariadoComponent } from './inventariado/inventariado';
import { UsuariosComponent } from './usuarios/usuarios';

@NgModule({
  declarations: [
    MainComponent,
    ProveedoresComponent,
    CategoriaComponent,
    PersonalComponent,
    InventariadoComponent,
    ProductosComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,  // ✅ AGREGAR ESTO
  ],
  exports: [
    MainComponent
  ]
})
export class DashboardModule { }
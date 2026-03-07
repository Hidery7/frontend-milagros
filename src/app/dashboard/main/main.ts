/*import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {

  currentUser: Usuario | null = null;
  activeSection: string = '';

  activeModule?: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    roles: string[];
  };

  modules = [
    {
      id: 'proveedores',
      name: 'Proveedores',
      icon: 'bi-truck',
      color: 'primary',
      description: 'Gestión de proveedores',
      roles: ['admin']
    },
    {
      id: 'productos',
      name: 'Productos',
      icon: 'bi-box-seam',
      color: 'success',
      description: 'Catálogo de productos',
      roles: ['admin']
    },
    {
      id: 'inventariado',
      name: 'Inventariado',
      icon: 'bi-clipboard-check',
      color: 'warning',
      description: 'Control de inventario',
      roles: ['admin', 'user']
    },
    {
      id: 'personal',
      name: 'Personal',
      icon: 'bi-people',
      color: 'info',
      description: 'Gestión de personal',
      roles: ['admin']
    },
    {
      id: 'categoria',
      name: 'Categorías',
      icon: 'bi-tags',
      color: 'danger',
      description: 'Categorías de productos',
      roles: ['admin']
    },
    {
      id: 'usuarios',
      name: 'Usuarios',
      icon: 'bi-people-fill',
      color: 'dark',
      description: 'Gestión de usuarios',
      roles: ['admin']
    }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getUsuario();
  }

  // ✅ Solo muestra módulos permitidos según el rol
  get modulesVisibles() {
    const rol = this.authService.getRol();
    return this.modules.filter(m => m.roles.includes(rol!));
  }

  selectModule(moduleId: string): void {
    this.activeSection = moduleId;
    this.updateActiveModule();
  }

  updateActiveModule() {
    this.activeModule = this.modulesVisibles.find(m => m.id === this.activeSection);
  }

  backToMenu(): void {
    this.activeSection = '';
    this.activeModule = undefined;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
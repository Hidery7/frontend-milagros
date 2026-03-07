/*import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {

}
*/
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth';
import { PersonalService } from '../../services/personal';
import { Personal } from '../../models/personal';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.html',
  standalone: false
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  personal: Personal[] = [];

  showForm = false;
  isEditing = false;

  currentUsuario: Partial<Usuario> = {};

  constructor(private usuarioService: UsuarioService,
    private personalService:PersonalService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadUsuarios();
    this.loadPersonal();
  }

  loadUsuarios() {
    this.usuarioService.findAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
        console.log('Usuarios Cantidad:', data, length)
      },
      error: (err) => console.error(err)
    });
  }

  loadPersonal(){
    this.personalService.findAll().subscribe({
      next:(data) => {
        this.personal = data;
        this.cdr.detectChanges();
      }
    });
  }
  showCreateForm() {
    this.showForm = true;
    this.isEditing = false;
    this.currentUsuario = { roles: 'user', estado: 'activo' };
  }

  showEditForm(usuario: Usuario) {
    this.showForm = true;
    this.isEditing = true;
    this.currentUsuario = { ...usuario, password: '' };
  }

  cancelForm() {
    this.showForm = false;
    this.currentUsuario = {};
  }

  saveUsuario() {
    // No enviar password vacío al editar
    const payload = { ...this.currentUsuario };
    if (this.isEditing && !payload.password) delete payload.password;

    if (this.isEditing && this.currentUsuario.id_usuario) {
      this.usuarioService.update(this.currentUsuario.id_usuario, payload).subscribe({
        next: () => { this.loadUsuarios(); this.cancelForm(); }
      });
    } else {
      this.usuarioService.create(payload).subscribe({
        next: () => { this.loadUsuarios(); this.cancelForm(); }
      });
    }
  }

  deleteUsuario(id: number) {
    if (confirm('¿Eliminar usuario?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => this.loadUsuarios()
      });
    }
  }
}
/*import { Component } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css',
})
export class Proveedores {

}
*/

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.html',
  styleUrls: ['./proveedores.css'], // ✅ corregido
})
export class ProveedoresComponent implements OnInit {

//Propiedades
  proveedores: Proveedor[] = [];
  proveedorfiltrados: Proveedor[] = [];

  showForm: boolean = false;
  isEditing: boolean = false;

  searchTerm: string = '';

  currentProveedor: Proveedor = {} as Proveedor;

//Constructor
  constructor(
    private proveedoresService: ProveedoresService,
    private cdr: ChangeDetectorRef
  ) {}

//Ciclo de vida
  ngOnInit(): void {
    this.loadProveedores();
  }
//Metodos CRUD
  loadProveedores(): void {
    this.proveedoresService.findAll().subscribe({
      next: (data: Proveedor[]) => {
        console.log('✅ Datos recibidos:', data);
        console.log('✅ Proveedores Cantidad:', data.length);
        this.proveedores = data;
        this.proveedorfiltrados = [...data]; // 🔹 importante para la tabla
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ Error al cargar proveedores:', err)
    });
  }

  showCreateForm(): void {
    this.isEditing = false;
    this.currentProveedor = {} as Proveedor;
    this.showForm = true;
  }

  showEditForm(proveedor: Proveedor): void {
    this.isEditing = true;
    this.currentProveedor = { ...proveedor };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.currentProveedor = {} as Proveedor;
  }

  saveProveedor(): void {
    if (this.isEditing && this.currentProveedor.id_proveedor) {
      // Actualizar proveedor
      this.proveedoresService
        .update(this.currentProveedor.id_proveedor, this.currentProveedor)
        .subscribe({
          next: () => {
            console.log('Proveedor actualizado');
            this.loadProveedores();
            this.cancelForm();
          },
          error: (err) => console.error('Error al actualizar proveedor:', err)
        });
    } else {
      // Crear nuevo proveedor
      this.proveedoresService.create(this.currentProveedor).subscribe({
        next: () => {
          console.log('Proveedor creado');
          this.loadProveedores();
          this.cancelForm();
        },
        error: (err) => console.error('Error al crear proveedor:', err)
      });
    }
  }

  deleteProveedor(id?: number): void {
    if (id && confirm('¿Está seguro de eliminar este proveedor?')) {
      this.proveedoresService.delete(id).subscribe({
        next: () => {
          console.log('Proveedor eliminado');
          this.loadProveedores();
        },
        error: (err) => console.error('Error al eliminar proveedor:', err)
      });
    }
  }

 //Filtros
  onSearchChange(value: string): void {
    this.searchTerm = value;
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.proveedorfiltrados = [...this.proveedores];
      return;
    }

    this.proveedorfiltrados = this.proveedores.filter(p =>
      p.nombre?.toLowerCase().includes(term) ||
      p.ruc?.toString().includes(term) ||
      p.email?.toLowerCase().includes(term)
    );
  }

  // Getter opcional si quieres filtrar sin usar onSearchChange
  get filteredProveedores(): Proveedor[] {
    if (!this.searchTerm) return this.proveedorfiltrados;
    const term = this.searchTerm.toLowerCase().trim();
    return this.proveedorfiltrados.filter(p =>
      p.nombre?.toLowerCase().includes(term) ||
      p.ruc?.toString().includes(term) ||
      p.email?.toLowerCase().includes(term)
    );
  }
}
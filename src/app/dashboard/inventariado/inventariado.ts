/*import { Component } from '@angular/core';
import { InventariadoService } from '../../services/inventariado';
import { ProductosService } from '../../services/productos';
import { PersonalService } from '../../services/personal';
import { Inventario } from '../../models/inventario';
import { Producto } from '../../models/producto';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-inventariado',
  standalone: false,
  templateUrl: './inventariado.html',
  styleUrls: ['./inventariado.css']
})
export class InventariadoComponent {

  inventarios: Inventario[] = [];
  productos: Producto[] = [];
  personal: Personal[] = [];

  showForm: boolean = false;
  isEditing: boolean = false;
  currentInventario: Inventario = this.getEmptyInventario();
  searchTerm: string = '';

  constructor(
    private inventariadoService: InventariadoService,
    private productosService: ProductosService,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // 🔹 Cargar todos los datos (igual patrón que Productos)
  loadData(): void {
    this.inventariadoService.getAll().subscribe({
      next: (data) => {
        this.inventarios = data;
        console.log('Inventarios cargados:', data);
      },
      error: (error) => {
        console.error('Error al cargar inventarios:', error);
      }
    });

    this.productosService.getAll().subscribe({
      next: (data) => this.productos = data,
      error: (error) => console.error('Error al cargar productos:', error)
    });

    this.personalService.getAll().subscribe({
      next: (data) => this.personal = data,
      error: (error) => console.error('Error al cargar personal:', error)
    });
  }

  // 🔹 Inventario vacío
  getEmptyInventario(): Inventario {
    return {
      productoId: 0,
      cantidad: 0,
      ubicacion: '',
      fechaInventario: new Date(),
      personalId: 0,
      observaciones: '',
      tipo: 'ENTRADA'
    };
  }

  // 🔹 Mostrar formulario de creación
  showCreateForm(): void {
    this.isEditing = false;
    this.currentInventario = this.getEmptyInventario();
    this.showForm = true;
  }

  // 🔹 Mostrar formulario de edición
  showEditForm(inventario: Inventario): void {
    this.isEditing = true;
    this.currentInventario = { ...inventario };
    this.showForm = true;
  }

  // 🔹 Cancelar formulario
  cancelForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.currentInventario = this.getEmptyInventario();
  }

  // 🔹 Guardar (crear / actualizar)
  saveInventario(): void {
    if (this.isEditing && this.currentInventario.id) {
      this.inventariadoService.update(
        this.currentInventario.id,
        this.currentInventario
      ).subscribe({
        next: () => {
          console.log('Inventario actualizado');
          this.loadData();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error al actualizar inventario:', error);
        }
      });
    } else {
      this.inventariadoService.create(this.currentInventario).subscribe({
        next: () => {
          console.log('Inventario creado');
          this.loadData();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error al crear inventario:', error);
        }
      });
    }
  }

  // 🔹 Eliminar inventario
  deleteInventario(id: number | undefined): void {
    if (id && confirm('¿Está seguro de eliminar este registro?')) {
      this.inventariadoService.delete(id).subscribe({
        next: () => {
          console.log('Inventario eliminado');
          this.loadData();
        },
        error: (error) => {
          console.error('Error al eliminar inventario:', error);
        }
      });
    }
  }

  // 🔹 Helpers (mostrar nombres)
  getProductoNombre(id: number): string {
    return this.productos.find(p => p.id_producto === id)?.nombre || 'N/A';
  }

  getPersonalNombre(id: number): string {
    const persona = this.personal.find(p => p.id === id);
    return persona ? `${persona.nombres} ${persona.apellidos}` : 'N/A';
  }

  // 🔹 Filtro de búsqueda (igual estilo Productos)
  get filteredInventarios(): Inventario[] {
    if (!this.searchTerm) {
      return this.inventarios;
    }

    const term = this.searchTerm.toLowerCase();

    return this.inventarios.filter(inv =>
      this.getProductoNombre(inv.productoId).toLowerCase().includes(term) ||
      this.getPersonalNombre(inv.personalId).toLowerCase().includes(term) ||
      inv.ubicacion.toLowerCase().includes(term)
    );
  }
}
*/




/*import { Component, OnInit } from '@angular/core';
import { InventariadoService } from '../../services/inventariado';
import { ProductosService } from '../../services/productos';
import { PersonalService } from '../../services/personal';
import { Inventario } from '../../models/inventario';
import { Producto } from '../../models/producto';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-inventariado',
  standalone: false,
  templateUrl: './inventariado.html',
  styleUrls: ['./inventariado.css']
})
export class InventariadoComponent implements OnInit {
  inventarios: Inventario[] = [];
  productos: Producto[] = [];
  personal: Personal[] = [];
  showForm: boolean = false;
  isEditing: boolean = false;
  currentInventario: Inventario = this.getEmptyInventario();
  searchTerm: string = '';

  constructor(
    private inventariadoService: InventariadoService,
    private productosService: ProductosService,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.inventariadoService.getAll().subscribe({
      next: (data) => this.inventarios = data,
      error: (err) => console.error('Error al cargar inventarios:', err)
    });

    this.productosService.getAll().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });

    this.personalService.getAll().subscribe({
      next: (data) => this.personal = data,
      error: (err) => console.error('Error al cargar personal:', err)
    });
  }

  getEmptyInventario(): Inventario {
    return {
      id: undefined,       // para TypeScript, opcional
      productoId: 0,
      cantidad: 0,
      ubicacion: '',
      fechaInventario: new Date(),
      personalId: 0,
      observaciones: '',
      tipo: 'ENTRADA'
    };
  }

  showCreateForm(): void {
    this.isEditing = false;
    this.currentInventario = this.getEmptyInventario();
    this.showForm = true;
  }

  showEditForm(inventario: Inventario): void {
    this.isEditing = true;
    this.currentInventario = { ...inventario };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.currentInventario = this.getEmptyInventario();
  }

  saveInventario(): void {
    if (this.isEditing && this.currentInventario.id) {
      this.inventariadoService.update(this.currentInventario.id, this.currentInventario).subscribe({
        next: () => {
          console.log('Inventario actualizado');
          this.loadData();
          this.cancelForm();
        },
        error: (err) => console.error('Error al actualizar inventario:', err)
      });
    } else {
      this.inventariadoService.create(this.currentInventario).subscribe({
        next: () => {
          console.log('Inventario creado');
          this.loadData();
          this.cancelForm();
        },
        error: (err) => console.error('Error al crear inventario:', err)
      });
    }
  }

  deleteInventario(id: number | undefined): void {
    if (id && confirm('¿Está seguro de eliminar este registro?')) {
      this.inventariadoService.delete(id).subscribe({
        next: () => {
          console.log('Inventario eliminado');
          this.loadData();
        },
        error: (err) => console.error('Error al eliminar inventario:', err)
      });
    }
  }

  getProductoNombre(id: number): string {
    return this.productos.find(p => p.id === id)?.nombre || 'N/A';
  }

  getPersonalNombre(id: number): string {
    const p = this.personal.find(p => p.id === id);
    return p ? `${p.nombres} ${p.apellidos}` : 'N/A';
  }

  // Filtro opcional por búsqueda (producto o personal)
  get filteredInventarios(): Inventario[] {
    if (!this.searchTerm) return this.inventarios;

    return this.inventarios.filter(inv => {
      const producto = this.getProductoNombre(inv.productoId).toLowerCase();
      const personal = this.getPersonalNombre(inv.personalId).toLowerCase();
      const term = this.searchTerm.toLowerCase();
      return producto.includes(term) || personal.includes(term) || inv.ubicacion.toLowerCase().includes(term);
    });
  }
}*/

/*import { Component } from '@angular/core';

@Component({
  selector: 'app-inventariado',
  standalone: false,
  templateUrl: './inventariado.html',
  styleUrl: './inventariado.css',
})
export class Inventariado {

}*/
/*// src/app/dashboard/inventariado/inventariado.component.ts
import { Component, OnInit } from '@angular/core';
//import { InventariadoService } from '../../services/inventariado.service';
//import { ProductosService } from '../../services/productos.service';
//import { PersonalService } from '../../services/personal.service';
//import { Inventariado } from '../../models/inventariado';
import { Producto } from '../../models/producto';
import { Personal } from '../../models/personal';
import { InventariadoService } from '../../services/inventariado';
import { ProductosService } from '../../services/productos';
import { PersonalService } from '../../services/personal';
import { Inventario } from '../../models/inventario';
@Component({
  selector: 'app-inventariado',
  standalone:false,
  templateUrl: './inventariado.html',
  styleUrls: ['./inventariado.css']
})
export class InventariadoComponent implements OnInit {
  inventarios: Inventario[] = [];
  productos: Producto[] = [];
  personal: Personal[] = [];
  showForm: boolean = false;
  isEditing: boolean = false;
  currentInventario: Inventario= this.getEmptyInventario();

  constructor(
    private inventariadoService: InventariadoService,
    private productosService: ProductosService,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.inventariadoService.getAll().subscribe(data => this.inventarios = data);
    this.personalService.getAll().subscribe(data => this.personal = data);
  }

  getEmptyInventario(): Inventario {
    return {
      productoId: 0,
      cantidad: 0,
      ubicacion: '',
      fechaInventario: new Date(),
      personalId: 0,
      observaciones: '',
      tipo: 'ENTRADA'
    };
  }

  showCreateForm(): void {
    this.isEditing = false;
    this.currentInventario = this.getEmptyInventario();
    this.showForm = true;
  }

  showEditForm(inventario: Inventario): void {
    this.isEditing = true;
    this.currentInventario = { ...inventario };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveInventario(): void {
    if (this.isEditing && this.currentInventario.id) {
      this.inventariadoService.update(this.currentInventario.id, this.currentInventario).subscribe(() => {
        this.loadData();
        this.cancelForm();
      });
    } else {
      this.inventariadoService.create(this.currentInventario).subscribe(() => {
        this.loadData();
        this.cancelForm();
      });
    }
  }

  deleteInventario(id: number | undefined): void {
    if (id && confirm('¿Está seguro de eliminar este registro?')) {
      this.inventariadoService.delete(id).subscribe(() => this.loadData());
    }
  }

  getProductoNombre(id: number): string {
    return this.productos.find(p => p.id === id)?.nombre || 'N/A';
  }

  getPersonalNombre(id: number): string {
    const p = this.personal.find(p => p.id === id);
    return p ? `${p.nombres} ${p.apellidos}` : 'N/A';
  }
}*/
/*
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InventariadoService } from '../../services/inventariado';
import { ProductosService } from '../../services/productos';
import { PersonalService } from '../../services/personal';
import { Inventario } from '../../models/inventario';
import { Producto } from '../../models/producto';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-inventariado',
  standalone: false,
  templateUrl: './inventariado.html',
  styleUrls: ['./inventariado.css']
})
export class InventariadoComponent implements OnInit {

  inventarios: Inventario[] = [];
  inventariofiltrado: Inventario[] = [];

  productos: Producto[] = [];
  personal: Personal[] = [];

  showForm: boolean = false;
  isEditing: boolean = false;

  //currentInventario: Inventario = this.getEmptyInventario();
  currentInventario: Inventario = {} as Inventario;
  searchTerm: string = '';

  constructor(
    private inventariadoService: InventariadoService,
    private personalService :PersonalService,
    private productosService:ProductosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadInventariado();
    this.loadProductos ();
    this.loadPersonal();
  }
  /*
    // 🔹 Cargar todos los datos
    loadData(): void {
      this.inventariadoService.getAll().subscribe({
        next: (data: Inventario[]) => this.inventarios = data,
        error: (error) => console.error('Error al cargar inventarios:', error)
      });
  
      this.productosService.findAll().subscribe({
        next: (data: Producto[]) => this.productos = data,
        error: (error) => console.error('Error al cargar productos:', error)
      });
  
      this.personalService.getAll().subscribe({
        next: (data: Personal[]) => this.personal = data,
        error: (error) => console.error('Error al cargar personal:', error)
      });
    }

  loadInventariado() {
    this.inventariadoService.findAll().subscribe({
      next: (data: Inventario[]) => {
        console.log('✅ Datos recibidos:', data);
        console.log('✅ Cantidad:', data.length);
        this.inventarios = data;
        this.inventariofiltrado = [...data];
        this.cdr.detectChanges();
      },
      error:(err) => console.error('Error al cargar inventarios:'err)
        // Mapear datos
       /* this.inventarios = data.map(p => ({
          ...p,
          categoriaNombre: p.id_categoria?.nombre || 'Sin categoría',
          proveedorNombre: p.id_proveedor?.nombre || 'Sin proveedor'
      /*});

        // ✅ Copiar al array filtrado
        this.inventariofiltrado = [...this.inventarios];

        console.log('✅ productosFiltrados:', this.inventariofiltrado.length);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error:', err);
      }
    });
  }
*/

// 🔹 Inventario vacío
/* getEmptyInventario(): Inventario {
   return {
     id: undefined,
     productoId: 0,
     cantidad: 0,
     ubicacion: '',
     fechaInventario: new Date(),
     personalId: 0,
     observaciones: '',
     tipo: 'ENTRADA'
   };
 }
loadproductos(){
 this.ProductosService.findAll().subscribe({
   next:(data:Producto[])=>{
     console.log('Productos recibidos:'data);
     this.cdr.detectChanges();
   }
   error:(err)=> console.error('Error al cargar productos:',err)
 })
}

 // 🔹 Mostrar formulario de creación
 showCreateForm(): void {
   this.isEditing = false;
   this.currentInventario = {} as Inventario;
   this.showForm = true;
 }

 // 🔹 Mostrar formulario de edición
 showEditForm(inventario: Inventario): void {
   this.isEditing = true;
   this.currentInventario = { ...inventario };
   this.showForm = true;
 }

 // 🔹 Cancelar formulario
 cancelForm(): void {
   this.showForm = false;
   this.isEditing = false;
   this.currentInventario = {} as Inventario;
 }

 // 🔹 Guardar inventario
 saveInventario(): void {
   if (this.isEditing && this.currentInventario.id) {
     this.inventariadoService.update(this.currentInventario.id, this.currentInventario)
       .subscribe({
         next: () => { this.loadInventariado(); this.cancelForm(); },
         error: (err) => console.error('Error al actualizar inventario:', err)
       });
   } else {
     this.inventariadoService.create(this.currentInventario)
       .subscribe({
         next: () => { this.loadInventariado(); this.cancelForm(); },
         error: (err) => console.error('Error al crear inventario:', err)
       });
   }
 }

 // 🔹 Eliminar inventario
 deleteInventario(id?: number): void {
   if (!id) return;
   if (confirm('¿Está seguro de eliminar este registro?')) {
     this.inventariadoService.delete(id)
       .subscribe({
         next: () => this.loadInventariado(),
         error: (err) => console.error('Error al eliminar inventario:', err)
       });
   }
 }

 // 🔹 Helpers para mostrar nombres
 getProductoNombre(id: number): string {
   return this.productos.find(p => p.id_producto === id)?.nombre || 'N/A';
 }

 getPersonalNombre(id: number): string {
   const persona = this.personal.find(p => p.id_personal === id);
   return persona ? `${persona.nombres} ${persona.apellidos}` : 'N/A';
 }

 // 🔹 Filtrado en tiempo real
 get filteredInventarios(): Inventario[] {
   if (!this.searchTerm) return this.inventarios;
   const term = this.searchTerm.toLowerCase();
   return this.inventarios.filter(inv =>
     this.getProductoNombre(inv.id_producto).toLowerCase().includes(term) ||
     this.getPersonalNombre(inv.id_personal).toLowerCase().includes(term) ||
     inv.ubicacion.toLowerCase().includes(term)
   );
 }
}

*/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InventariadoService } from '../../services/inventariado';
import { ProductosService } from '../../services/productos';
import { PersonalService } from '../../services/personal';
import { Inventario } from '../../models/inventario';
import { Producto } from '../../models/producto';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-inventariado',
  standalone: false,
  templateUrl: './inventariado.html',
  styleUrls: ['./inventariado.css']
})
export class InventariadoComponent implements OnInit {

  inventarios: Inventario[] = [];
  inventariofiltrado: Inventario[] = [];
  productos: Producto[] = [];
  personal: Personal[] = [];

  showForm: boolean = false;
  isEditing: boolean = false;
  currentInventario: Inventario = {} as Inventario;
  searchTerm: string = '';

  constructor(
    private inventariadoService: InventariadoService,
    private productosService: ProductosService,
    private personalService: PersonalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadInventariado();
    this.loadProductos();   // ✅ Cargar productos
    this.loadPersonal();    // ✅ Cargar personal
  }

  // ✅ Cargar inventarios
  loadInventariado() {
    this.inventariadoService.findAll().subscribe({
      next: (data: Inventario[]) => {
        console.log('✅ Inventarios recibidos:', data);
        this.inventarios = data;
        this.inventariofiltrado = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ Error al cargar inventarios:', err)
    });
  }

  // ✅ Cargar productos
  loadProductos() {
    this.productosService.findAll().subscribe({
      next: (data: Producto[]) => {
        console.log('✅ Productos recibidos:', data);
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ Error al cargar productos:', err)
    });
  }

  // ✅ Cargar personal
  loadPersonal() {
    this.personalService.findAll().subscribe({
      next: (data: Personal[]) => {
        console.log('✅ Personal recibido:', data);
        this.personal = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ Error al cargar personal:', err)
    });
  }

  showCreateForm(): void {
    this.isEditing = false;
    this.currentInventario = {
      id_producto: 0,
      id_personal: 0,
      tipo: 'ENTRADA',
      cantidad: 0,
      ubicacion: '',
      fecha: new Date(),
      observaciones: ''
    } as Inventario;
    this.showForm = true;
  }

  showEditForm(inventario: Inventario): void {
    this.isEditing = true;
    this.currentInventario = { ...inventario };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.currentInventario = {} as Inventario;
  }

  saveInventario(): void {
    if (this.isEditing && this.currentInventario.id_inventariado) {
      this.inventariadoService.update(this.currentInventario.id_inventariado, this.currentInventario)
        .subscribe({
          next: () => {
            console.log('✅ Inventario actualizado');
            this.loadInventariado();
            this.cancelForm();
          },
          error: (err) => console.error('❌ Error al actualizar:', err)
        });
    } else {
      this.inventariadoService.create(this.currentInventario)
        .subscribe({
          next: () => {
            console.log('✅ Inventario creado');
            this.loadInventariado();
            this.cancelForm();
          },
          error: (err) => console.error('❌ Error al crear:', err)
        });
    }
  }

  deleteInventario(id?: number): void {
    if (!id) return;
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.inventariadoService.delete(id).subscribe({
        next: () => {
          console.log('✅ Inventario eliminado');
          this.loadInventariado();
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  /*getProductoNombre(id: number): string {
    return this.productos.find(p => p.id_producto === id)?.nombre || 'N/A';
  }

  getPersonalNombre(id: number): string {
    const persona = this.personal.find(p => p.id_personal === id);
    return persona ? `${persona.nombres} ${persona.apellidos}` : 'N/A';
  }*/
  getProductoNombre(id: number): string {
    const producto = this.productos.find(p => p.id_producto === id);
    return producto?.nombre || 'N/A';
  }

  getPersonalNombre(id: number): string {
    const persona = this.personal.find(p => p.id_personal === id);
    return persona ? `${persona.nombres} ${persona.apellidos}` : 'N/A';
  }

  get filteredInventarios(): Inventario[] {
    if (!this.searchTerm) return this.inventarios;
    const term = this.searchTerm.toLowerCase();
    return this.inventarios.filter(inv =>
      this.getProductoNombre(inv.id_producto).toLowerCase().includes(term) ||
      this.getPersonalNombre(inv.id_personal).toLowerCase().includes(term) ||
      inv.ubicacion?.toLowerCase().includes(term)
    );
  }
}
/*import { Component } from '@angular/core';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria {

}*/
/*import { Component, OnInit } from '@angular/core';
//import { CategoriaService } from '../../services/categoria';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria';
@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  showForm: boolean = false;
  isEditing: boolean = false;
  currentCategoria: Categoria = this.getEmptyCategoria();
  searchTerm: string = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  // Carga todas las categorías
  loadCategorias(): void {
    this.categoriaService.getAll().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  // Devuelve una categoría vacía
  getEmptyCategoria(): Categoria {
    return { id: undefined, nombre: '', descripcion: '', activo: true };
  }

  // Mostrar formulario de creación
  showCreateForm(): void {
    this.isEditing = false;
    this.currentCategoria = this.getEmptyCategoria();
    this.showForm = true;
  }

  // Mostrar formulario de edición
  showEditForm(categoria: Categoria): void {
    this.isEditing = true;
    this.currentCategoria = { ...categoria };
    this.showForm = true;
  }

  // Cancelar formulario
  cancelForm(): void {
    this.showForm = false;
    this.currentCategoria = this.getEmptyCategoria();
  }

  // Guardar o actualizar categoría
  saveCategoria(): void {
    if (this.isEditing && this.currentCategoria.id) {
      this.categoriaService.update(this.currentCategoria.id, this.currentCategoria).subscribe({
        next: () => {
          console.log('Categoría actualizada');
          this.loadCategorias();
          this.cancelForm();
        },
        error: (err) => console.error('Error al actualizar categoría:', err)
      });
    } else {
      this.categoriaService.create(this.currentCategoria).subscribe({
        next: () => {
          console.log('Categoría creada');
          this.loadCategorias();
          this.cancelForm();
        },
        error: (err) => console.error('Error al crear categoría:', err)
      });
    }
  }

  // Eliminar categoría
  deleteCategoria(id: number | undefined): void {
    if (id && confirm('¿Está seguro de eliminar esta categoría?')) {
      this.categoriaService.delete(id).subscribe({
        next: () => {
          console.log('Categoría eliminada');
          this.loadCategorias();
        },
        error: (err) => console.error('Error al eliminar categoría:', err)
      });
    }
  }

  // Filtro de búsqueda
  get filteredCategorias(): Categoria[] {
    if (!this.searchTerm) return this.categorias;
    return this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (c.descripcion && c.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  } 
}*/
import { ChangeDetectorRef, OnInit, Component } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class CategoriaComponent implements OnInit {

  categoriafiltrada: Categoria[] = [];
  categorias: Categoria[] = [];

  showForm: boolean = false;
  isEditing: boolean = false;

 // currentCategoria: Categoria = this.getEmptyCategoria();
 currentCategoria: Categoria = {} as Categoria;
  searchTerm: string = '';

  constructor(private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCategoria();
  }

  // 🔹 Cargar datos (igual que Productos)
  loadCategoria(): void {
    this.categoriaService.findAll().subscribe({
      next: (data:Categoria[]) => {
        console.log('Categorías cargadas:', data);
        console.log('Categorias Cantidad:',data,length)
         this.categorias = data;
        this.categoriafiltrada = [...this.categorias];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  // 🔹 Categoría vacía
  /*getEmptyCategoria(): Categoria {
    return {
      nombre: '',
      descripcion: '',
      activo: true
    };
  }*/

  // 🔹 Mostrar formulario de creación
  showCreateForm(): void {
    this.isEditing = false;
   // this.currentCategoria = this.getEmptyCategoria();
   this.currentCategoria = {} as Categoria
    this.showForm = true;
  }

  // 🔹 Mostrar formulario de edición
  showEditForm(categoria: Categoria): void {
    this.isEditing = true;
    this.currentCategoria = { ...categoria };
    this.showForm = true;
  }

  // 🔹 Cancelar formulario
  cancelForm(): void {
    this.showForm = false;
    this.isEditing = false;
    //this.currentCategoria = this.getEmptyCategoria();
  this.currentCategoria = {} as Categoria
  }

  // 🔹 Guardar (crear / actualizar)
  saveCategoria(): void {
    if (this.isEditing && this.currentCategoria.id_categoria) {
      this.categoriaService.update(this.currentCategoria.id_categoria, this.currentCategoria).subscribe({
        next: () => {
          console.log('Categoría actualizada');
          this.loadCategoria();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error al actualizar categoría:', error);
        }
      });
    } else {
      this.categoriaService.create(this.currentCategoria).subscribe({
        next: () => {
          console.log('Categoría creada');
          this.loadCategoria();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error al crear categoría:', error);
        }
      });
    }
  }

  // 🔹 Eliminar categoría
  deleteCategoria(id: number | undefined): void {
    if (id && confirm('¿Está seguro de eliminar esta categoría?')) {
      this.categoriaService.delete(id).subscribe({
        next: () => {
          console.log('Categoría eliminada');
          this.loadCategoria();
        },
        error: (error) => {
          console.error('Error al eliminar categoría:', error);
        }
      });
    }
  }
  /*
    // 🔹 Filtro de búsqueda (igual que Productos)
    get filteredCategorias(): Categoria[] {
      if (!this.searchTerm) {
        return this.categorias;
      }
      return this.categorias.filter(c =>
        c.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }*/
  get filteredCategoria(): Categoria[] {
    if (!this.searchTerm) return this.categoriafiltrada;
    const term = this.searchTerm.toLowerCase().trim();
    return this.categoriafiltrada.filter(c =>
      c.nombre?.toLowerCase().includes(term) ||
      c.descripcion?.toLowerCase().includes(term)
    );
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.categoriafiltrada = [...this.categorias];
      return;
    }

    this.categoriafiltrada = this.categorias.filter(c =>
      c.nombre?.toLowerCase().includes(term) ||
      c.descripcion?.toLowerCase().includes(term)
    );
  }

}



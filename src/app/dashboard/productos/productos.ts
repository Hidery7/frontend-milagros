import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { CategoriaService } from '../../services/categoria';
import { ProveedoresService } from '../../services/proveedores';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
  standalone: false
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categoria: Categoria[] = [];
  proveedor: Proveedor[] = [];

  showForm = false;
  isEditing = false;

  currentProducto: Producto = {} as Producto;
  imagePreview: string | ArrayBuffer | null = null;
  searchTerm: string = '';

  constructor(
    private productosService: ProductosService,
    private proveedorService: ProveedoresService,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProductos();
    this.loadProveedor();
    this.loadCategoria();
  }

  loadProductos() {
    this.productosService.findAll().subscribe({
      next: (data: Producto[]) => {
        console.log('Productos encontrados:',data)
        console.log('Cantidad:',data.length)
        this.productos = data;
        this.productosFiltrados = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  loadProveedor() {
    this.proveedorService.findAll().subscribe({
      next: (data: Proveedor[]) => {
        this.proveedor = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar proveedores:', err)
    });
  }

  loadCategoria() {
    this.categoriaService.findAll().subscribe({
      next: (data: Categoria[]) => {
        this.categoria = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  showCreateForm(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentProducto = {
      id_categoria: 0,
      id_proveedor: 0,
      nombre: '',
      descripcion: '',
      marca: '',
      modelo: '',
      serie: '',
      precio: 0,
      stock: 0,
      imagen: '',
      fechaRegistro: new Date(),
    } as Producto;
    this.imagePreview = null;
  }

  showEditForm(producto: any): void {
    this.showForm = true;
    this.isEditing = true;

    // ✅ FIX: Extraer solo el ID si el backend devuelve objetos anidados
    this.currentProducto = {
      ...producto,
      id_categoria: producto.id_categoria?.id_categoria ?? producto.id_categoria,
      id_proveedor: producto.id_proveedor?.id_proveedor ?? producto.id_proveedor,
    };

    this.imagePreview = producto.imagen || null;
  }

  cancelForm(): void {
    this.showForm = false;
    this.currentProducto = {} as Producto;
    this.imagePreview = null;
  }

  saveProducto(): void {
    console.log('Producto a guardar:', this.currentProducto);
    if (this.isEditing && this.currentProducto.id_producto) {
      this.productosService.update(this.currentProducto.id_producto!, this.currentProducto).subscribe({
        next: () => {
          this.loadProductos();
          this.cancelForm();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.productosService.create(this.currentProducto).subscribe({
        next: () => {
          this.loadProductos();
          this.cancelForm();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  deleteProducto(id?: number): void {
    if (!id) return;
    if (confirm('¿Está seguro de eliminar este producto?')) {
      this.productosService.delete(id).subscribe({
        next: () => this.loadProductos(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productosService.uploadImage(file).subscribe({
        next: (res) => {
          this.currentProducto.imagen = res.url;
          const reader = new FileReader();
          reader.onload = () => this.imagePreview = reader.result;
          reader.readAsDataURL(file);
        },
        error: (err) => console.error('Error al subir imagen:', err)
      });
    }
  }

  getCategoriaNombre(categoria: any): string {
    return categoria?.nombre || 'N/A';
  }

  getProveedorNombre(proveedor: any): string {
    return proveedor?.nombre || 'N/A';
  }

  getfilteredProductos(): Producto[] {
    if (!this.searchTerm) return this.productos;
    const term = this.searchTerm.toLowerCase();
    return this.productos.filter(p =>
      p.nombre?.toLowerCase().includes(term) ||
      p.marca?.toLowerCase().includes(term) ||
      this.getProveedorNombre(p.id_proveedor).toLowerCase().includes(term) ||
      this.getCategoriaNombre(p.id_categoria).toLowerCase().includes(term)
    );
  }
}
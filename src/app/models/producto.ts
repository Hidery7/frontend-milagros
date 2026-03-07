/*export interface Producto {
    
  id_producto?: number;
  nombre: string;
  descripcion: string;
  marca:string,
  modelo:string,
  serie:string,
  precio: number;
  stock: number;
  id_proveedor: number;
  id_categoria: number;
  imagen: string;
  fechaRegistro: Date;

}*/
export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion?: string;
  marca: string;
  modelo: string;
  serie: string;
  precio: number;
  stock: number;
  imagen: string;
  fechaRegistro: Date;

  id_categoria: number;
  id_proveedor: number;

  // ✅ Campos extra que envía tu backend
  categoriaNombre?: string;
  proveedorNombre?: string;
}

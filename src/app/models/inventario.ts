export interface Inventario {
  id_inventariado?: number;
  id_producto: number;
  id_personal: number;
  producto?:any;
  personal?:any
  tipo: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
  cantidad: number;
  ubicacion: string;
  fecha: Date;
 // observaciones: string;


}

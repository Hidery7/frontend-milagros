export interface Proveedor {
    // src/app/models/proveedor.ts

  id_proveedor?: number;
  nombre: string;
  ruc: number;
  telefono: number;
  email: string;
  direccion: string;
  fechaRegistro?: Date;

}

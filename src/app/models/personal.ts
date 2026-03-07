export interface Personal {
  // src/app/models/personal.ts

  id_personal?: number;
  nombres: string;
  apellidos: string;
  dni: number;
  telefono: number;
  email: string;
  salario: number;
  estado: boolean;
  cargo: string;
  departamento: number;
  fecha_contratacion: Date;
}

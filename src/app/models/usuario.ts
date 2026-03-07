export type Rol = 'admin'|'user'

export interface Usuario {
    // src/app/models/usuario.ts
/*
  id_usuario?: number;
  username: string;
  password?: string;
  email: string;
  roles: Rol;
  estado:string;
  fecha_creacion?:Date;
  personal?:any;
  id_personal?:number;
*/
// ✅ Agregar en usuario.ts

  id_usuario: number;
  usuario: string;    // 
  password?: string;
  roles: 'admin' | 'user';
  estado: string;
  fecha_creacion?: Date;
  personal?: any;
  id_personal?: number;

}
export interface LoginResponse{
  access_token:string;
  usuario:Usuario;
}

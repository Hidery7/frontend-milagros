/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  // ✅ OBLIGATORIO que sea Producto[]
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  update(id: number, producto: Producto): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/productos'; // URL de tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Obtener un producto por ID
  findOne(id_producto: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id_producto}`);
  }

  // Crear un producto
  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Actualizar un producto

// services/productos.ts - solo cambia update para usar PUT
update(id_producto: number, producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(`${this.apiUrl}/${id_producto}`, producto); // ✅ PUT
}
  // Eliminar un producto
  delete(id_producto: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_producto}`);
  }

  // Subir imagen (opcional)
  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload`, formData);
  }
}


/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Categoria {
  
}
*/
// src/app/services/categoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';  // Importa el modelo correcto

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/categoria'; // URL de la API para categorías

  constructor(private http: HttpClient) {}

  // Obtiene todas las categorías desde la API
  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  // Crea una nueva categoría en la API
  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  // Actualiza una categoría existente en la API
  update(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  // Elimina una categoría de la API
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

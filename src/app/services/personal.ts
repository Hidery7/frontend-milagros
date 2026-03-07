/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Personal {
  
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal'; // Importa tu modelo de Personal

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = 'http://localhost:3000/personal';

  constructor(private http: HttpClient) {}

  // Obtener todos los registros de personal
  findAll(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  // Obtener un solo registro por ID
  getById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo registro
  create(personal: Personal): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrl, personal);
  }

  // Actualizar registro existente
  update(id: number, personal: Personal): Observable<Personal> {
    return this.http.put<Personal>(`${this.apiUrl}/${id}`, personal);
  }

  // Eliminar registro por ID
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

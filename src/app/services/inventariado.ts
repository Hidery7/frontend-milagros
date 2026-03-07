// services/inventariado.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Inventariado } from '../models/inventariado';
import { Inventario } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventariadoService {
  private apiUrl = 'http://localhost:3000/inventariado';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.apiUrl);
  }

  getById(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.apiUrl}/${id}`);
  }

  create(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.apiUrl, inventario);
  }

  update(id: number, inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(`${this.apiUrl}/${id}`, inventario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

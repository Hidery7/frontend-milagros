/*import { Component } from '@angular/core';

@Component({
  selector: 'app-personal',
  standalone: false,
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal {

}*/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PersonalService } from '../../services/personal';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.html',
  styleUrls: ['./personal.css'],
  standalone: false
})
export class PersonalComponent implements OnInit {

  personal: Personal[] = [];
  personalFiltrados: Personal[] = [];

  showForm: boolean = false;
  isEditing: boolean = false;

  searchTerm: string = '';
  currentPersonal: Personal = {} as Personal;

  constructor(
    private personalService: PersonalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPersonal();
  }

  loadPersonal(): void {
    this.personalService.findAll().subscribe({
      next: (data: Personal[]) => {
        console.log('✅ Datos recibidos:', data);
        console.log('✅ Personal Cantidad:', data.length);
        this.personal = data;
        this.personalFiltrados = [...this.personal];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }

  showCreateForm(): void {
    this.isEditing = false;
    this.currentPersonal = {} as Personal;
    this.showForm = true;
  }

  showEditForm(personal: Personal): void {
    this.isEditing = true;
    this.currentPersonal = { ...personal };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.currentPersonal = {} as Personal;
  }

  savePersonal(): void {
    if (this.isEditing) {
      this.personalService.update(
        this.currentPersonal.id_personal!,
        this.currentPersonal
      ).subscribe({
        next: () => {
          this.loadPersonal();
          this.cancelForm();
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      this.personalService.create(this.currentPersonal).subscribe({
        next: () => {
          this.loadPersonal();
          this.cancelForm();
        },
        error: (err) => console.error('❌ Error al crear:', err)
      });
    }
  }
  deletePersonal(id?: number): void {
    if (id && confirm('¿Está seguro de eliminar este personal?')) {
      this.personalService.delete(id).subscribe({
        next: () => this.loadPersonal(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  get filteredPersonal(): Personal[] {
    if (!this.searchTerm) return this.personalFiltrados;
    const term = this.searchTerm.toLowerCase().trim();
    return this.personalFiltrados.filter(p =>
      p.nombres?.toLowerCase().includes(term) ||
      p.apellidos?.toLowerCase().includes(term) ||
      p.dni?.toString().includes(term) ||
      p.email?.toLowerCase().includes(term) ||
      p.telefono?.toString().includes(term)
    );
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.personalFiltrados = [...this.personal];
      return;
    }

    this.personalFiltrados = this.personal.filter(p =>
      p.nombres?.toLowerCase().includes(term) ||
      p.apellidos?.toLowerCase().includes(term) ||
      p.dni?.toString().includes(term) ||
      p.email?.toLowerCase().includes(term) ||
      p.telefono?.toString().includes(term)
    );
  }

}
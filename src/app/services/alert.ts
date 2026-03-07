/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Alert {
  
}
*/
import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  /* =========================
     ALERTAS BÁSICAS (CENTRO)
     ========================= */

  success(title: string, text?: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: 'Aceptar'
    });
  }

  error(title: string, text?: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Aceptar'
    });
  }

  warning(title: string, text?: string): void {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Aceptar'
    });
  }

  info(title: string, text?: string): void {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: 'Aceptar'
    });
  }

  /* =========================
     TOASTS (ESQUINA)
     ========================= */

  toastSuccess(title: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
  }

  toastError(title: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }

  /* =========================
     CONFIRMACIÓN
     ========================= */

  confirm(
    title: string,
    text: string,
    confirmButtonText = 'Sí',
    cancelButtonText = 'Cancelar'
  ): Promise<SweetAlertResult> {

    return Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    });
  }

  /* =========================
     CARGANDO
     ========================= */

  loading(title = 'Procesando...'): void {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  close(): void {
    Swal.close();
  }
}

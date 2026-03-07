/*import { CanActivateFn } from '@angular/router';

export const rolesGuard: CanActivateFn = (route, state) => {
  return true;
};
*/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rolesPermitidos: string[] = route.data['roles'] ?? [];
    const rolActual = this.auth.getRol();

    if (rolActual && rolesPermitidos.includes(rolActual)) return true;

    this.router.navigate(['/sin-permiso']);
    return false;
  }
}
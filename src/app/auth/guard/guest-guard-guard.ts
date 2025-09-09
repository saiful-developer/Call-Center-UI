import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const guestGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = !!sessionStorage.getItem('jwt');

  if (isLoggedIn) {
    router.navigate(['/agent/dashboard']); // redirect if already logged in
    return false; // block login page
  }


  return true;
};

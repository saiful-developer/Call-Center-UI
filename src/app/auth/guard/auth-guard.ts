import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && window.sessionStorage) {
    const token = sessionStorage.getItem('jwt');
    const userRole = sessionStorage.getItem('user_role');

    if (!token) {
      router.navigate(['/login']);
      return false;
    }
    // Allow navigation to correct dashboard or other allowed routes
    if (userRole === 'AGENT' && state.url.startsWith('/agent')) return true;
    if (userRole === 'SUPERVISOR' && state.url.startsWith('/supervisor')) return true;
    if (userRole === 'ADMIN' && state.url.startsWith('/admin')) return true;


  }
  return false;
};
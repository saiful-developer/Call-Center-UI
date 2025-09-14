import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && window.sessionStorage) {
    const token = sessionStorage.getItem('jwt');
    const userRole = sessionStorage.getItem('role'); // role stored at login

    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    // Check if this route expects a role
    const expectedRole = route.data?.['role'];
    
    if (expectedRole && expectedRole !== userRole) {
      // Redirect user to their correct dashboard
      if (userRole === 'agent') router.navigate(['/agent/dashboard']);

      else if (userRole === 'supervisor') router.navigate(['/supervisor/dashboard']);

      else router.navigate(['/login']);
      
      return false;
    }

    return true; // Token exists and role matches

  }  else {
    router.navigate(['/login']);
    return false;
  }
};

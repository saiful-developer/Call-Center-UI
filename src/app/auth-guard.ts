import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // Check if window and localStorage exist in the only in browser
  // window only exists in browser
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const token = sessionStorage.getItem('auth_token');

    if (token) {
      return true; // user logged in
    } else {
      router.navigate(['/login']);
      return false; // not logged in
    }


  } else {
    // If no window or localStorage, deny access or handle as needed
    router.navigate(['/login']);
    return false;
  }


  return true;
};

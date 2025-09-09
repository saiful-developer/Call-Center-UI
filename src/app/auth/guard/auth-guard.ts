import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  // window only exists in browser
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const token = sessionStorage.getItem('jwt');

    if (token) {
      return true; 
    } else {
      router.navigate(['/login']);
      return false; 
    }


  } else {
    router.navigate(['/login']);
    return false;
  }


  return true;
};

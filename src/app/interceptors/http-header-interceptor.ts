import { HttpInterceptorFn } from '@angular/common/http';

export const httpHeaderInterceptor: HttpInterceptorFn = (req, next) => {


  console.log('interceptor:', req.url);

  // debugger

  //save token after login
  const token = sessionStorage.getItem('jwt');

  //requred values for http hea
  const apiKey = "fba2cda8265247f2f4dd9de8e4db35c5";
  const encodedKey = btoa(apiKey);
  const xBrandKey = 'KOTHACallMaster007';
  const encodedBrandKey = btoa(xBrandKey);

  const xApiUser = 'kothacallmaster';
  const encodecXApiUser = btoa(xApiUser);

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'x-brand-key': encodedBrandKey,
      'x-api-user': encodecXApiUser,
      'x-api-key': encodedKey
    }
  })

  return next(cloneRequest);
};

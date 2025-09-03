import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';  //
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 

import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(BrowserAnimationsModule),
    // provideRouter(routes)
  ],
})
.catch((err) => console.error(err));

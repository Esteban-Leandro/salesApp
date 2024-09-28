import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeEsCL from '@angular/common/locales/es-CL';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsCL)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es-CL' },

  ]
};

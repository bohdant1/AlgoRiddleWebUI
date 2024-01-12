import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimations(),
              importProvidersFrom(
                provideFirebaseApp(() =>initializeApp(environment.firebase))
              )]
};

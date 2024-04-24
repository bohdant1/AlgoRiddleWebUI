import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { CodeEditorModule } from '@ngstack/code-editor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimations(),
              importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
              importProvidersFrom(
                CodeEditorModule.forRoot({
                  editorVersion: '0.46.0'
                })),
              provideHttpClient()]
};

import {
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { NgxUiLoaderConfig } from 'projects/ngx-ui-loader/src/lib/utils/interfaces';
import {
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
} from 'projects/ngx-ui-loader/src/public-api';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  fastFadeOut: true,
  fgsColor: 'red',
  pbColor: 'red',
};

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
      NgxUiLoaderRouterModule,
      NgxUiLoaderHttpModule,
    ),
  ],
}).catch((err) => console.error(err));

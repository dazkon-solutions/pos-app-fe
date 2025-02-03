/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  ApplicationConfig, 
  importProvidersFrom, 
  provideZoneChangeDetection 
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { 
  TranslateLoader, 
  TranslateModule 
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { 
  HttpClient, 
  provideHttpClient 
} from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LeftPanelState } from 'src/app/store/left-panel-config';
import { ResourceState } from 'src/app/store/resource-config';
import { AppearanceState } from 'src/app/store/appearance';
import { MainSearchState } from 'src/app/store/main-search';
import { NavigationState } from 'src/app/store/navigation-config';
import { MenuState } from 'src/app/store/menu-config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimationsAsync(), 
    provideStore(
      [
        ResourceState,
        AppearanceState,
        NavigationState,
        MenuState,
        MainSearchState,
        LeftPanelState
      ],
      withNgxsLoggerPlugin(),
      withNgxsStoragePlugin({
        keys: '*'
      })
    ),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
      })
    ]),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
  ]
};

function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, 'locale/', '.json');
}
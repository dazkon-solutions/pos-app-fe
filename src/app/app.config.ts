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
  inject, 
  provideAppInitializer, 
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
import { 
  LOCAL_STORAGE_ENGINE, 
  withNgxsStoragePlugin 
} from '@ngxs/storage-plugin';
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
import { ProductCategoryUIState } from './store/product-category';
import { StateKey } from './store/state-key.token';
import { PermissionState } from './store/permission';
import { 
  provideCacheableAnimationLoader, 
  provideLottieOptions 
} from 'ngx-lottie';
import { 
  EndpointConfigService, 
  EndpointConfigState 
} from './store/endpoint-config';
import { ProductCategoryState } from './store/product-category/data/product-category.state';
import { AlertState } from './store/alerts';
import { DeletableState } from './store/deletable';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimationsAsync(), 
    provideStore(
      [
        EndpointConfigState,
        PermissionState,
        ResourceState,
        AppearanceState,
        NavigationState,
        MenuState,
        MainSearchState,
        LeftPanelState,
        ProductCategoryUIState,
        ProductCategoryState,
        AlertState,
        DeletableState
      ],
      withNgxsLoggerPlugin(),
      withNgxsStoragePlugin({
        keys: [
          {
            key: StateKey.ENDPOINT,
            engine: LOCAL_STORAGE_ENGINE
          },
          {
            key: StateKey.RESOURCE,
            engine: LOCAL_STORAGE_ENGINE
          },
          {
            key: StateKey.APPEARANCE,
            engine: LOCAL_STORAGE_ENGINE
          },
          {
            key: StateKey.MENU,
            engine: LOCAL_STORAGE_ENGINE
          },
          {
            key: StateKey.MAIN_SEARCH,
            engine: LOCAL_STORAGE_ENGINE
          },
          {
            key: StateKey.LEFT_PANEL,
            engine: LOCAL_STORAGE_ENGINE
          },
          {
            key: StateKey.PRODUCT_CATEGORY_UI,
            engine: LOCAL_STORAGE_ENGINE
          }
        ]
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
    provideAppInitializer(() => initializeApp(inject(EndpointConfigService))),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    provideCacheableAnimationLoader()
  ]
};

function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, 'locale/', '.json');
}

function initializeApp(endpointConfig: EndpointConfigService) {
  return endpointConfig.loadConfig();
}
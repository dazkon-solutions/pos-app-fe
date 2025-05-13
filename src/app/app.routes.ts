/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Routes } from '@angular/router';
import { RoutePaths } from './common/navigation';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./protected/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  { 
    path: RoutePaths.POS_PAGE, 
    loadComponent: () => import('./protected/pos/pos.component')
      .then(m => m.PosComponent)
  },
  { 
    path: RoutePaths.PRODUCT_LIST_PAGE, 
    loadComponent: () => import('./protected/product-manager/products/products.component')
      .then(m => m.ProductsComponent)
  },
  { 
    path: RoutePaths.CATEGORY_LIST_PAGE, 
    loadComponent: () => import('./protected/product-manager/categories/categories.component')
      .then(m => m.CategoriesComponent)
  },
  { 
    path: RoutePaths.BRAND_LIST_PAGE, 
    loadComponent: () => import('./protected/product-manager/brands/brands.component')
      .then(m => m.BrandsComponent)
  },
];
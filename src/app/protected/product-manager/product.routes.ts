/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const PRODUCT_MANAGER_ROUTS: Routes = [
  { 
    path: '', 
    component: ProductsComponent
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.component')
      .then(m => m.CategoriesComponent) 
  }
];
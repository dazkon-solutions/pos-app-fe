/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

export const PRODUCT_ROUTS: Routes = [
  { 
    path: '', 
    component: ProductsComponent,
    children: [
      // {
      //   path: '',
      //   loadComponent: () => import('./protected/dashboard/dashboard.component')
      //     .then(m => m.DashboardComponent) 
      // }
    ]
  }
];
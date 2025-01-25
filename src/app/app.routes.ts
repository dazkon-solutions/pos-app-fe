/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./protected/dashboard/dashboard.component')
      .then(m => m.DashboardComponent) 
  },
  { 
    path: 'products', 
    loadChildren: () => import('./protected/products/product.routes')
      .then(m => m.PRODUCT_ROUTS) 
  }
];
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/common/services';
import { CategoryComponent } from './category/category.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private dialogSvc: DialogService) { }

  openForm(): void {
    this.dialogSvc.open(CategoryComponent, { });
  }
}
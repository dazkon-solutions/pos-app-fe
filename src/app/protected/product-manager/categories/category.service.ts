/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from '@angular/core';
import { 
  BottomSheetService, 
  DialogService 
} from 'src/app/common/services';
import { 
  DeleteHandlerConfig, 
  DeleteHandlerService 
} from 'src/app/private/system/common/delete-handler';
import { 
  CheckProductCategoryDeletable, 
  DeleteProductCategory 
} from 'src/app/store/product-category/data/product-category.state';
import { Action } from 'src/app/common/enums';
import { CategoryComponent } from './category/category.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private dialogSvc: DialogService,
    private deleteHandlerSvc: DeleteHandlerService,
    private bottomSheetSvc: BottomSheetService
  ) { }

  async openForm(): Promise<void> {
    const { CategoryComponent } = await import('./category/category.component');
    this.dialogSvc.open(CategoryComponent, { });
  }

  async openFilter(): Promise<void> {
    const { CategoryFilterComponent } = await import('./category-filter/category-filter.component');
    this.bottomSheetSvc.open(CategoryFilterComponent);
  }

  delete(category: any): void {
    const { id, name } = category;
    const config: DeleteHandlerConfig = {
      checkActionInstance: new CheckProductCategoryDeletable(id),
      deleteActionInstance: new DeleteProductCategory(id),
      deleteAction: Action.DELETE_CATEGORY,
      description: name
    };

    this.deleteHandlerSvc.handleDelete(config);
  }
}
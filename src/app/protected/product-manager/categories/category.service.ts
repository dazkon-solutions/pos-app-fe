/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  inject, 
  Injectable 
} from '@angular/core';
import { DialogService } from 'src/app/common/services';
import { 
  DeleteHandlerConfig, 
  DeleteHandlerService 
} from 'src/app/private/system/common/delete-handler';
import { ProductCategory } from 'src/app/common/interfaces';
import { 
  CheckProductCategoryDeletable, 
  DeleteProductCategory 
} from 'src/app/store/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private dialogSvc = inject(DialogService);
  private deleteHandlerSvc = inject(DeleteHandlerService);

  async openForm(): Promise<void> {
    const { CategoryComponent } = await import('./category/category.component');
    this.dialogSvc.open(CategoryComponent, { });
  }

  delete(category: ProductCategory): void {
    const config: DeleteHandlerConfig = {
      checkActionInstance: new CheckProductCategoryDeletable(category.id),
      deleteActionInstance: new DeleteProductCategory(category.id),
      description: category.name
    };

    this.deleteHandlerSvc.handleDelete(config);
  }
}
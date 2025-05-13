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
import { ProductBrand } from 'src/app/common/interfaces';
import { 
  CheckProductBrandDeletable, 
  DeleteProductBrand 
} from 'src/app/store/product-brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private dialogSvc = inject(DialogService);
  private deleteHandlerSvc = inject(DeleteHandlerService);

  async openForm(): Promise<void> {
    const { BrandComponent } = await import('./brand/brand.component');
    this.dialogSvc.open(BrandComponent, { });
  }

  delete(brand: ProductBrand): void {
    const config: DeleteHandlerConfig = {
      checkActionInstance: new CheckProductBrandDeletable(brand.id),
      deleteActionInstance: new DeleteProductBrand(brand.id),
      description: brand.name
    };

    this.deleteHandlerSvc.handleDelete(config);
  }
}
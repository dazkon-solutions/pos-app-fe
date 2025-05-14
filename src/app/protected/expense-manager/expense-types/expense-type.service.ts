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
import { ExpenseType } from 'src/app/common/interfaces';
import { 
  CheckExpenseTypeDeletable, 
  DeleteExpenseType 
} from 'src/app/store/expense-type';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {
  private dialogSvc = inject(DialogService);
  private deleteHandlerSvc = inject(DeleteHandlerService);

  async openForm(): Promise<void> {
    const { ExpenseTypeComponent } = await import('./expense-type/expense-type.component');
    this.dialogSvc.open(ExpenseTypeComponent, { });
  }

  delete(type: ExpenseType): void {
    const config: DeleteHandlerConfig = {
      checkActionInstance: new CheckExpenseTypeDeletable(type.id),
      deleteActionInstance: new DeleteExpenseType(type.id),
      description: type.name
    };

    this.deleteHandlerSvc.handleDelete(config);
  }
}
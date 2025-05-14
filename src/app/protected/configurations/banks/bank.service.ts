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
import { Bank } from 'src/app/common/interfaces';
import { 
  CheckBankDeletable, 
  DeleteBank 
} from 'src/app/store/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private dialogSvc = inject(DialogService);
  private deleteHandlerSvc = inject(DeleteHandlerService);

  async openForm(): Promise<void> {
    const { BankComponent } = await import('./bank/bank.component');
    this.dialogSvc.open(BankComponent, { });
  }

  delete(bank: Bank): void {
    const config: DeleteHandlerConfig = {
      checkActionInstance: new CheckBankDeletable(bank.id),
      deleteActionInstance: new DeleteBank(bank.id),
      description: bank.name
    };

    this.deleteHandlerSvc.handleDelete(config);
  }
}
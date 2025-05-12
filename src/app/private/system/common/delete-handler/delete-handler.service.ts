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
} from "@angular/core";
import { Store } from "@ngxs/store";
import { DialogService } from "src/app/common/services";
import { SetDeletableResponse } from "src/app/store/delete-handle";
import { DeleteHandlerComponent } from "./delete-handler.component";
import { DeleteHandlerConfig } from "./delete-handler.interface";

@Injectable({
  providedIn: 'root'
})
export class DeleteHandlerService {
  private dialogSvc = inject(DialogService);
  private store = inject(Store);

  handleDelete(config: DeleteHandlerConfig): void {
    const { checkActionInstance } = config;
    this.dialogSvc.open(DeleteHandlerComponent, { 
      data: config,
      autoFocus: false,
      width: '590px',
      minHeight: '313px'
    });

    if(checkActionInstance) {
      this.store.dispatch(checkActionInstance);

    } else {
      // Default deletable
      this.store.dispatch(new SetDeletableResponse({
        isDeletable: true,
        messages: []
      }));
    }
  }
}
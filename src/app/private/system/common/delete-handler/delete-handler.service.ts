/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { DialogService } from "src/app/common/services";
import { DeleteHandlerComponent } from "./delete-handler.component";
import { DeleteHandlerConfig } from "./delete-handler.interface";

@Injectable({
  providedIn: 'root'
})
export class DeleteHandlerService {
  constructor(
    private dialogSvc: DialogService,
    private store: Store
  ) { }

  handleDelete(config: DeleteHandlerConfig): void {
    const { checkActionInstance } = config;
    this.dialogSvc.open(DeleteHandlerComponent, { 
      data: config,
      autoFocus: false,
      minWidth: '500px'
    });

    this.store.dispatch(checkActionInstance);
  }
}
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

@Injectable({
  providedIn: 'root'
})
export class PosService {
  constructor(private dialogSvc: DialogService) { }

  async open(): Promise<void> {
    const { PosComponent } = await import('./pos.component');
    this.dialogSvc.open(PosComponent, { 
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh'
    }, ['daz-pos']);
  }
}
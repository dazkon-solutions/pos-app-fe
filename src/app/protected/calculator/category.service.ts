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

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private dialogSvc = inject(DialogService);

  async open(): Promise<void> {
    const { CalculatorComponent } = await import('./calculator.component');
    this.dialogSvc.open(CalculatorComponent, { });
  }
}
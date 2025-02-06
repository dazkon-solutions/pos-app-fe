/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { BottomSheetService } from "src/app/common/services";
import { DynamicFilterComponent } from "./dynamic-filter.component";


@Injectable({ 
  providedIn: 'root'
})
export class DynamicFilterService {
  constructor(private bottomSheetSvc: BottomSheetService) { }

  open(): void {
    this.bottomSheetSvc.open(DynamicFilterComponent);
  }
}
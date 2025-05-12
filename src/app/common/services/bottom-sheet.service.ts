/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  computed,
  inject, 
  Injectable 
} from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import { 
  MatBottomSheet, 
  MatBottomSheetRef 
} from "@angular/material/bottom-sheet";
import { Store } from "@ngxs/store";
import { AppearanceState } from "src/app/store/appearance";


@Injectable({ 
  providedIn: 'root'
})
export class BottomSheetService {
  private bottomSheet = inject(MatBottomSheet);
  private store = inject(Store);

  private isLightTheme = this.store.selectSignal(AppearanceState.isLightTheme);

  private theme = computed(() => this.isLightTheme() 
    ? 'light-theme' 
    : 'dark-theme');

  async open<T extends ComponentType<any>>(
    component: T,
    data: any = { },
    styleClasses: string[] = []
  ): Promise<MatBottomSheetRef<T>> {
    return this.bottomSheet.open(component, { 
      autoFocus: true,
      data,
      panelClass: [
        this.theme(),
        ...styleClasses
      ]
    });
  }

  closeAll(): void {
    this.bottomSheet.dismiss();
  }
}
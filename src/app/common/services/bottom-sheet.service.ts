/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import { 
  MatBottomSheet, 
  MatBottomSheetRef 
} from "@angular/material/bottom-sheet";
import { ThemeService } from "./theme.service";


@Injectable({ 
  providedIn: 'root'
})
export class BottomSheetService {
  constructor(
    private bottomSheet: MatBottomSheet,
    private themeSvc: ThemeService
  ) { }

  async open<T extends ComponentType<any>>(
    component: T,
    data: any = { },
    styleClasses: string[] = []
  ): Promise<MatBottomSheetRef<T>> {
    const isLightTheme = await this.themeSvc.isLightThemeAsync();

    return this.bottomSheet.open(component, { 
      autoFocus: true,
      data,
      panelClass: [
        'bottom-sheet',
        isLightTheme ? 'light-theme' : 'dark-theme',
        ...styleClasses
      ]
    });
  }

  closeAll(): void {
    this.bottomSheet.dismiss();
  }
}
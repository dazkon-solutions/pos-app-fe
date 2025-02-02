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
  MatDialog, 
  MatDialogConfig, 
  MatDialogRef 
} from "@angular/material/dialog";
import { ThemeService } from "./theme.service";


@Injectable({ 
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private themeSvc: ThemeService
  ) { }

  async open<T extends ComponentType<any>>(
    component: T,
    config: MatDialogConfig,
    styleClasses: string[] = [],
  ): Promise<MatDialogRef<T>> {
    const isLightTheme = await this.themeSvc.isLightThemeAsync();

    return this.dialog.open(component, { 
      ...config,
      panelClass: [
        'dialog',
        isLightTheme ? 'light-theme' : 'dark-theme',
        ...styleClasses
      ]
    });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
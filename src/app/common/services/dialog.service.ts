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
  MatDialog, 
  MatDialogConfig, 
  MatDialogRef 
} from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { AppearanceState } from "src/app/store/appearance";

@Injectable({ 
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);
  private store = inject(Store);

  private isLightTheme = this.store.selectSignal(AppearanceState.isLightTheme);

  private theme = computed(() => this.isLightTheme() 
    ? 'light-theme' 
    : 'dark-theme');

  async open<T extends ComponentType<any>>(
    component: T,
    config: MatDialogConfig,
    styleClasses: string[] = [],
  ): Promise<MatDialogRef<T>> {

    return this.dialog.open(component, { 
      disableClose: true,
      ...config,
      panelClass: [
        this.theme(),
        ...styleClasses
      ]
    });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
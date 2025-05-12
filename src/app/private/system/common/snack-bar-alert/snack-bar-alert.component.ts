/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  ChangeDetectionStrategy, 
  Component, 
  computed, 
  inject 
} from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { LocaleKeys } from 'src/app/common/constants';

@Component({
  selector: 'daz-snack-bar-alert',
  imports: [
    CORE_IMPORTS,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './snack-bar-alert.component.html',
  styleUrl: './snack-bar-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackBarAlertComponent {
  private snackBarRef = inject(MatSnackBarRef<SnackBarAlertComponent>)

  config = computed(() => this.snackBarRef.containerInstance.snackBarConfig);

  LocaleKeys = LocaleKeys;

  onClickClose(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.snackBarRef.dismissWithAction();
  }
}
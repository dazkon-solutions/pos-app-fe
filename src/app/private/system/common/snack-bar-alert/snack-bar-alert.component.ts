/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { 
  MatSnackBarConfig, 
  MatSnackBarRef 
} from '@angular/material/snack-bar';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { LocaleKeys } from 'src/app/common/constants';
import { SNACK_BAR_ALERT_MAT_IMPORTS } from './snack-bar-alert-imports';

@Component({
  selector: 'daz-snack-bar-alert',
  imports: [
    CORE_IMPORTS,
    SNACK_BAR_ALERT_MAT_IMPORTS
  ],
  templateUrl: './snack-bar-alert.component.html',
  styleUrl: './snack-bar-alert.component.scss'
})
export class SnackBarAlertComponent {
  config!: MatSnackBarConfig;
  LocaleKeys = LocaleKeys;

  constructor(private snackBarRef: MatSnackBarRef<SnackBarAlertComponent>) { 
    this.config = this.snackBarRef.containerInstance.snackBarConfig;
  }

  onClickClose(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.snackBarRef.dismissWithAction();
  }
}
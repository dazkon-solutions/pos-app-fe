/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Component, 
  Inject 
} from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef 
} from '@angular/material/dialog';
import { 
  Observable, 
  of 
} from 'rxjs';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { Action } from 'src/app/common/enums';
import { LocaleKeys } from 'src/app/common/constants';
import { ActionButtonConfig } from '../../action-button';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { DYNAMIC_GRID_MAT_IMPORTS } from '../dynamic-grid-imports';

@Component({
  selector: 'daz-dynamic-grid-item-options',
  imports: [
    CORE_IMPORTS,
    DYNAMIC_GRID_MAT_IMPORTS,
    ActionButtonComponent
  ],
  templateUrl: './dynamic-grid-item-options.component.html',
  styleUrl: './dynamic-grid-item-options.component.scss'
})
export class DynamicGridItemOptionsComponent {
  LocaleKeys = LocaleKeys;
  
  constructor(
    private dialogRef: MatDialogRef<DynamicGridItemOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionButtonConfig[]
  ) { }

  onClick(action: Action): void {
    this.dialogRef.close(action);
  }

  getButtonConfigObservable(
    config: ActionButtonConfig
  ): Observable<ActionButtonConfig> {
    return of(config);
  }
}
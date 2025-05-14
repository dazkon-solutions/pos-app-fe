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
  signal
} from '@angular/core';
import { Permission } from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { GRID_VIEW_MAT_IMPORTS } from 'src/app/common/imports/grid-view-imports';
import { ExpenseType } from 'src/app/common/interfaces';
import { TrimTextPipe } from 'src/app/common/pipes';
import { AnimationPlayerComponent } from 'src/app/private/system/common/animation-player/animation-player.component';
import { BaseGridViewComponent } from 'src/app/private/system/common/base-grid-view-component';
import {
  ButtonConfig, 
  ButtonStyleClass, 
  ButtonType 
} from 'src/app/private/system/common/button';
import { ButtonComponent } from 'src/app/private/system/common/button/button.component';
import { GridItemSkeletonComponent } from 'src/app/private/system/common/skeletons/grid-item-skeleton/grid-item-skeleton.component';

@Component({
  selector: 'daz-expense-types-grid',
  imports: [
    CORE_IMPORTS,
    GRID_VIEW_MAT_IMPORTS,
    TrimTextPipe,
    GridItemSkeletonComponent,
    AnimationPlayerComponent,
    ButtonComponent
  ],
  templateUrl: './expense-types-grid.component.html',
  styleUrl: './expense-types-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseTypeGridComponent extends BaseGridViewComponent<ExpenseType> {
  protected viewBtn = signal<ButtonConfig>({
    type: ButtonType.FLAT,
    permission: Permission.VIEW_EXPENSE_TYPE,
    label: this.LocaleKeys.labels.buttons.view
  });

  protected deleteBtn = signal<ButtonConfig>({
    type: ButtonType.MENU_ITEM,
    icon: 'delete',
    label: this.LocaleKeys.labels.buttons.delete,
    permission: Permission.CAN_DELETE_EXPENSE_TYPE,
    styleClass: ButtonStyleClass.BTN_WARN
  });
}
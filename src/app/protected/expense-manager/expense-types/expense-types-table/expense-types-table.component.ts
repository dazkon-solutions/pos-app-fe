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
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { Permission } from 'src/app/common/enums';
import { TableSkeletonWithImageComponent } from 'src/app/private/system/common/skeletons/table-skeleton-with-image/table-skeleton-with-image.component';
import { TABLE_VIEW_IMPORTS } from 'src/app/common/imports/table-view-imports';
import { AnimationPlayerComponent } from 'src/app/private/system/common/animation-player/animation-player.component';
import { BaseTableViewComponent } from 'src/app/private/system/common/base-table-view-component';
import { 
  ButtonConfig, 
  ButtonStyleClass, 
  ButtonType 
} from 'src/app/private/system/common/button';
import { LocaleKeys } from 'src/app/common/constants';
import { ButtonComponent } from 'src/app/private/system/common/button/button.component';
import { ExpenseType } from 'src/app/common/interfaces';

@Component({
  selector: 'daz-expense-types-table',
  imports: [
    CORE_IMPORTS,
    TABLE_VIEW_IMPORTS,
    TableSkeletonWithImageComponent,
    AnimationPlayerComponent,
    ButtonComponent
  ],
  templateUrl: './expense-types-table.component.html',
  styleUrl: './expense-types-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpeneseTypesTableComponent extends BaseTableViewComponent<ExpenseType> {
  protected setDisplayedColumns(): string[] {
    return [
      'name',
      'viewAction',
      'deleteAction'
    ];
  }

  protected viewBtn = signal<ButtonConfig>({
    type: ButtonType.FLAT,
    permission: Permission.VIEW_EXPENSE_TYPE,
    label: LocaleKeys.labels.buttons.view
  });

  protected deleteBtn = signal<ButtonConfig>({
    type: ButtonType.MINI_FAB,
    icon: 'delete',
    tooltip: LocaleKeys.tooltips.delete,
    permission: Permission.CAN_DELETE_EXPENSE_TYPE,
    styleClass: ButtonStyleClass.BTN_WARN
  });
}
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { Action } from 'src/app/common/enums';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { TableSkeletonWithImageComponent } from 'src/app/private/system/common/skeletons/table-skeleton-with-image/table-skeleton-with-image.component';
import { TABLE_VIEW_IMPORTS } from 'src/app/common/imports/table-view-imports';
import { AnimationPlayerComponent } from 'src/app/private/system/common/animation-player/animation-player.component';
import { BaseTableViewComponent } from 'src/app/private/system/common/base-table-view-component';

@Component({
  selector: 'daz-categories-table',
  imports: [
    CORE_IMPORTS,
    TABLE_VIEW_IMPORTS,
    ActionButtonComponent,
    TableSkeletonWithImageComponent,
    AnimationPlayerComponent
  ],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss'
})
export class CategoriesTableComponent extends BaseTableViewComponent<any> {
  protected setDisplayedColumns(): string[] {
    return [
      'photo', 
      'position', 
      'name', 
      'weight', 
      'symbol',
      'viewAction',
      'deleteAction'
    ];
  }

  protected initializeButtons(): void {
    this.viewButton$ = new BehaviorSubject<ActionButtonConfig>({
      action: Action.VIEW_CATEGORY,
      type: ActionButtonType.VIEW
    });
  
    this.deleteButton$ = new BehaviorSubject<ActionButtonConfig>({
      action: Action.DELETE_CATEGORY,
      type: ActionButtonType.DELETE_FAB
    });
  }
}
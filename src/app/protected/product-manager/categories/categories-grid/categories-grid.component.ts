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
  Input,
  ViewChild
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { 
  BehaviorSubject,
  Observable
} from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { Action } from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { GRID_VIEW_MAT_IMPORTS } from 'src/app/common/imports/grid-view-imports';
import { ActionService } from 'src/app/common/services';
import { ArrayUtil } from 'src/app/common/utils';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { GridItemSkeletonType } from 'src/app/private/system/common/skeletons/grid-item-skeleton';
import { GridItemSkeletonComponent } from 'src/app/private/system/common/skeletons/grid-item-skeleton/grid-item-skeleton.component';

@Component({
  selector: 'daz-categories-grid',
  imports: [
    CORE_IMPORTS,
    GRID_VIEW_MAT_IMPORTS,
    ActionButtonComponent,
    GridItemSkeletonComponent
  ],
  templateUrl: './categories-grid.component.html',
  styleUrl: './categories-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesGridComponent {
  @ViewChild(MatMenuTrigger) 
  optionMenu!: MatMenuTrigger;

  @Input('dataSource$')
  dataSource$!: Observable<any[]>;

  @Input('isLoading$')
  isLoading$!: Observable<boolean>;

  defaultLoadingItems = ArrayUtil.createFakeArray(25);
  GridItemSkeletonType = GridItemSkeletonType;

  viewButton$ = new BehaviorSubject<ActionButtonConfig>({
    action: Action.VIEW_CATEGORY,
    type: ActionButtonType.VIEW
  });

  deleteButton$ = new BehaviorSubject<ActionButtonConfig>({
    action: Action.DELETE_CATEGORY,
    type: ActionButtonType.DELETE
  });

  deleteMenuItemButton$ = new BehaviorSubject<ActionButtonConfig>({
    action: Action.DELETE_CATEGORY,
    type: ActionButtonType.DELETE_MENU_ITEM
  });

  LocaleKeys = LocaleKeys;

  trackById(index: number, item: any): number {
    return item.position;
  }

  constructor(private actionSvc: ActionService) { }

  buttonClicked(
    action: Action, 
    payload: any
  ): void {
    this.actionSvc.emitAction({ 
      action,
      payload
    });

    this.optionMenu.closeMenu();
  }
}
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
  Input
} from '@angular/core';
import { 
  BehaviorSubject,
  Observable
} from 'rxjs';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { 
  Action, 
  TableColumnAlignmentStyleClass 
} from 'src/app/common/enums';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { TableSkeletonWithImageComponent } from 'src/app/private/system/common/skeletons/table-skeleton-with-image/table-skeleton-with-image.component';
import { 
  ActionService, 
  TableService 
} from 'src/app/common/services';
import { TABLE_VIEW_IMPORTS } from 'src/app/common/imports/table-view-imports';
import { AnimationType } from 'src/app/private/system/common/animation-player';
import { AnimationPlayerComponent } from 'src/app/private/system/common/animation-player/animation-player.component';

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
export class CategoriesTableComponent {
  @Input('dataSource$')
  dataSource$!: Observable<any[]>;

  @Input('isLoading$')
  isLoading$!: Observable<boolean>;

  viewButton$ = new BehaviorSubject<ActionButtonConfig>({
    action: Action.VIEW_CATEGORY,
    type: ActionButtonType.VIEW
  });

  deleteButton$ = new BehaviorSubject<ActionButtonConfig>({
    action: Action.DELETE_CATEGORY,
    type: ActionButtonType.DELETE_FAB
  });

  tableHeaderColor$: Observable<string>; 

  displayedColumns: string[] = [
    'photo', 
    'position', 
    'name', 
    'weight', 
    'symbol',
    'viewAction',
    'deleteAction'
  ];

  TableColumnAlignmentStyleClass = TableColumnAlignmentStyleClass;
  AnimationType = AnimationType;

  constructor(
    private tableSvc: TableService,
    private actionSvc: ActionService
  ) { 
    this.tableHeaderColor$ = this.tableSvc.tableHeaderColor$;
  }

  buttonClicked(
    action: Action, 
    payload: any
  ): void {
    this.actionSvc.emitAction({ 
      action,
      payload
    });
  }
}
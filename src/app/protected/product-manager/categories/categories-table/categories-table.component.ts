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
  EventEmitter, 
  Input, 
  Output 
} from '@angular/core';
import { 
  BehaviorSubject, 
  Observable 
} from 'rxjs';
import { ActionResponse } from 'src/app/common/interfaces';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { 
  Action, 
  Resource, 
  TableColumnAlignmentStyleClass 
} from 'src/app/common/enums';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { TableSkeletonWithImageComponent } from 'src/app/private/system/common/skeletons/table-skeleton-with-image/table-skeleton-with-image.component';
import { TableService } from 'src/app/common/services';
import { CATEGORY_MAT_IMPORTS } from '../category-imports';

@Component({
  selector: 'daz-categories-table',
  imports: [
    CORE_IMPORTS,
    CATEGORY_MAT_IMPORTS,
    ActionButtonComponent,
    TableSkeletonWithImageComponent
  ],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss'
})
export class CategoriesTableComponent {
  @Input('dataSource$')
  dataSource$!: Observable<any[]>;

  @Input('isLoading$')
  isLoading$!: Observable<boolean>;

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<ActionResponse>(true);

  viewButton$ = new BehaviorSubject<ActionButtonConfig>({
    resource: Resource.CATEGORIES,
    type: ActionButtonType.VIEW
  });

  deleteButton$ = new BehaviorSubject<ActionButtonConfig>({
    resource: Resource.CATEGORIES,
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

  constructor(private tableSvc: TableService) { 
    this.tableHeaderColor$ = this.tableSvc.tableHeaderColor$;
  }

  onClick(
    action: Action, 
    data: any
  ): void {
    this.buttonClicked.emit({ action, data });
  }
}
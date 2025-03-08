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
import { 
  Action,
  TableColumnAlignmentStyleClass 
} from 'src/app/common/enums';
import { 
  ActionService, 
  TableService 
} from 'src/app/common/services';
import { ActionButtonConfig } from './action-button';
import { AnimationType } from './animation-player';

@Component({
  template: ''
})
export abstract class BaseTableViewComponent<T> {
  @Input('dataSource$')
  dataSource$!: Observable<T[]>;

  @Input('isLoading$')
  isLoading$!: Observable<boolean>;

  viewButton$!: BehaviorSubject<ActionButtonConfig>;
  deleteButton$!: BehaviorSubject<ActionButtonConfig>;

  tableHeaderColor$: Observable<string>;
  displayedColumns: string[];

  TableColumnAlignmentStyleClass = TableColumnAlignmentStyleClass;
  AnimationType = AnimationType;

  constructor(
    protected tableSvc: TableService,
    protected actionSvc: ActionService
  ) { 
    this.tableHeaderColor$ = this.tableSvc.tableHeaderColor$;
    this.displayedColumns = this.setDisplayedColumns();
    this.initializeButtons();
  }

  protected abstract setDisplayedColumns(): string[];
  protected abstract initializeButtons(): void;

  buttonClicked(
    action: Action, 
    payload: T
  ): void {
    this.actionSvc.emitAction({ 
      action,
      payload
    });
  }
}
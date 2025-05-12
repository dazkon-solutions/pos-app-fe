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
  inject, 
  input, 
  signal
} from '@angular/core';
import { 
  Action,
  TableColumnAlignmentStyleClass 
} from 'src/app/common/enums';
import { ActionService } from 'src/app/common/services';
import { AnimationType } from './animation-player';

@Component({
  template: ''
})
export abstract class BaseTableViewComponent<T> {
  protected actionSvc = inject(ActionService);

  dataSource = input.required<T[]>();
  isLoading = input.required<boolean>();

  displayedColumns = signal<string[]>([]);

  TableColumnAlignmentStyleClass = TableColumnAlignmentStyleClass;
  AnimationType = AnimationType;
  Action = Action;

  constructor() { 
    this.displayedColumns.set(this.setDisplayedColumns());
  }

  protected abstract setDisplayedColumns(): string[];

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
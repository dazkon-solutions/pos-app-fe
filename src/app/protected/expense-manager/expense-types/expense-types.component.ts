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
  effect, 
  inject, 
  OnDestroy, 
  OnInit
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Store } from '@ngxs/store';
import { PageEvent } from '@angular/material/paginator';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionResponse } from 'src/app/common/interfaces';
import { 
  Action, 
  Resource 
} from 'src/app/common/enums';
import { ActionService } from 'src/app/common/services';
import { ViewTogglePaginationComponent } from 'src/app/private/system/common/view-toggle-pagination/view-toggle-pagination.component';
import { ToggleView } from 'src/app/store/base-ui';
import { StateKey } from 'src/app/store/state-key.token';
import { SetResource } from 'src/app/store/navigation-config';
import { 
  ExpenseTypeState, 
  ExpenseTypeUIState, 
  FetchExpenseTypeList, 
  LoadExpenseTypeList, 
  ResetExpenseTypeState, 
  SelectExpenseTypeById, 
  SetExpenseTypePaginate 
} from 'src/app/store/expense-type';
import { ExpeneseTypesTableComponent } from './expense-types-table/expense-types-table.component';
import { ExpenseTypeService } from './expense-type.service';
import { ExpenseTypeGridComponent } from './expense-types-grid/expense-types-grid.component';


@Component({
  selector: 'daz-expense-types',
  imports: [
    CORE_IMPORTS,
    ScrollingModule,
    ExpeneseTypesTableComponent,
    ExpenseTypeGridComponent,
    ViewTogglePaginationComponent
  ],
  templateUrl: './expense-types.component.html',
  styleUrl: './expense-types.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseTypesComponent implements 
  OnInit, 
  OnDestroy
{
  private store = inject(Store);
  private actionSvc = inject(ActionService);
  private service = inject(ExpenseTypeService);

  isListView = this.store.selectSignal(ExpenseTypeUIState.isListView);
  isLoading = this.store.selectSignal(ExpenseTypeUIState.isLoading);
  pagination = this.store.selectSignal(ExpenseTypeState.paginate);
  dataSource = this.store.selectSignal(ExpenseTypeState.getList);

  private readonly resource = Resource.EXPENSE_TYPES;
  
  constructor() { 
    effect(() => this.handleAction(this.actionSvc.action()));
  }

  ngOnInit(): void {
    this.store.dispatch([
      new SetResource(this.resource),
      new LoadExpenseTypeList(),
    ]);
  }

  private handleAction(response: ActionResponse): void {
    if (response.action === Action.DEFAULT) return;

    switch (response.action) {
      case Action.OPEN_FORM_DIALOG:
        if (response.payload.id) {
          this.store.dispatch(new SelectExpenseTypeById(response.payload.id));
        }
        this.service.openForm();
        break;
      case Action.DELETE_ITEM:
        this.service.delete(response.payload);
        break;
      case Action.PERFORM_MAIN_SEARCH:
        this.store.dispatch(new FetchExpenseTypeList(response.payload));
        break;
      default:
        console.warn('Unhandled action:', response.action);
    }

    this.actionSvc.resetAction();
  }

  viewToggled(): void {
    this.store.dispatch(new ToggleView(StateKey.EXPENSE_TYPE_UI));
  }

  paginationChanged(pageEvent: PageEvent): void {
    this.store.dispatch(new SetExpenseTypePaginate(pageEvent));
  }

  refreshData(): void {
    this.store.dispatch(new FetchExpenseTypeList());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetExpenseTypeState());
  }
}
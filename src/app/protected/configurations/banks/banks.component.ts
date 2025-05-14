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
  BankState, 
  BankUIState, 
  FetchBankList, 
  LoadBankList, 
  ResetBankState, 
  SelectBankById, 
  SetBankPaginate 
} from 'src/app/store/bank';
import { BanksTableComponent } from './banks-table/banks-table.component';
import { BankService } from './bank.service';
import { BanksGridComponent } from './banks-grid/banks-grid.component';


@Component({
  selector: 'daz-banks',
  imports: [
    CORE_IMPORTS,
    ScrollingModule,
    BanksTableComponent,
    BanksGridComponent,
    ViewTogglePaginationComponent
  ],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BanksComponent implements 
  OnInit, 
  OnDestroy
{
  private store = inject(Store);
  private actionSvc = inject(ActionService);
  private service = inject(BankService);

  isListView = this.store.selectSignal(BankUIState.isListView);
  isLoading = this.store.selectSignal(BankUIState.isLoading);
  pagination = this.store.selectSignal(BankState.paginate);
  dataSource = this.store.selectSignal(BankState.getList);

  private readonly resource = Resource.BANKS;
  
  constructor() { 
    effect(() => this.handleAction(this.actionSvc.action()));
  }

  ngOnInit(): void {
    this.store.dispatch([
      new SetResource(this.resource),
      new LoadBankList(),
    ]);
  }

  private handleAction(response: ActionResponse): void {
    if (response.action === Action.DEFAULT) return;

    switch (response.action) {
      case Action.OPEN_FORM_DIALOG:
        if (response.payload.id) {
          this.store.dispatch(new SelectBankById(response.payload.id));
        }
        this.service.openForm();
        break;
      case Action.DELETE_ITEM:
        this.service.delete(response.payload);
        break;
      case Action.PERFORM_MAIN_SEARCH:
        this.store.dispatch(new FetchBankList(response.payload));
        break;
      default:
        console.warn('Unhandled action:', response.action);
    }

    this.actionSvc.resetAction();
  }

  viewToggled(): void {
    this.store.dispatch(new ToggleView(StateKey.BANK_UI));
  }

  paginationChanged(pageEvent: PageEvent): void {
    this.store.dispatch(new SetBankPaginate(pageEvent));
  }

  refreshData(): void {
    this.store.dispatch(new FetchBankList());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetBankState());
  }
}
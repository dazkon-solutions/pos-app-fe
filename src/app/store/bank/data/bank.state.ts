/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  inject, 
  Injectable 
} from "@angular/core";
import { 
  Action,
  Selector, 
  State,
  StateContext
} from "@ngxs/store";
import { PageEvent } from "@angular/material/paginator";
import { 
  catchError, 
  EMPTY, 
  finalize, 
  Observable, 
  tap, 
  throwError
} from "rxjs";
import { 
  Bank, 
  BankFilterTerms 
} from "src/app/common/interfaces";
import { FilterHelper } from "src/app/common/helpers";
import { BankCtrlService } from "src/app/private/components";
import { LocaleKeys } from "src/app/common/constants";
import { 
  SetDeletableResponse, 
  SetDeleteHandleProcessingStatus 
} from "src/app/store/delete-handle";
import { BankStateModel } from "./bank-state.model";
import { StateKey } from "../../state-key.token";
import { BankStateConfigHelper } from "./bank-state-config.helper";
import { UIStateService } from "../../base-ui";
import { 
  AlertService, 
  AlertType 
} from "../../alerts";


export class FetchBankList {
  static readonly type = '[Bank] Fetch';
  constructor(public searchTerm?: string) { }
}

export class LoadBankList {
  static readonly type = '[Bank] Load list';
}

export class SetBankList {
  static readonly type = '[Bank] Set list';
  constructor(public payload: Bank[]) { }
}

export class SetBankFilterTerms {
  static readonly type = '[Bank] Set filter terms';
  constructor(public payload: BankFilterTerms) { }
}

export class ResetBankFilterTerms {
  static readonly type = '[Bank] Reset filter terms';
}

export class SetBankPaginate {
  static readonly type = '[Bank] Set paginate';
  constructor(public payload: PageEvent) { }
}

export class UpdateBankPaginateTotal {
  static readonly type = '[Bank] Update paginate total';
  constructor(public payload: number) { }
}

export class CreateBank {
  static readonly type = '[Bank] Create';
  constructor(public payload: Bank) { }
}

export class UpdateBank {
  static readonly type = '[Bank] Update';
  constructor(public payload: Bank) { }
}

export class DeleteBank {
  static readonly type = '[Bank] Delete by';
  constructor(public id: number) { }
}

export class CheckBankDeletable {
  static readonly type = '[Bank] Check deletable';
  constructor(public id: number) { }
}

export class SelectBankById {
  static readonly type = '[Bank] Select by id';
  constructor(public id: number) { }
}

export class ResetSelectedBank {
  static readonly type = '[Bank] Reset selected';
}

export class ResetBankState {
  static readonly type = '[Bank] Reset state';
}

@State<BankStateModel>({
  name: StateKey.BANK,
  defaults: BankStateConfigHelper.createDefault()
})
@Injectable()
export class BankState {
  private bankCtrlSvc = inject(BankCtrlService);
  private uiStateSvc = inject(UIStateService);
  private alertSvc = inject(AlertService);

  @Selector()
  static getList(state: BankStateModel): Bank[] {
    return state.list;
  }

  @Selector()
  static getCurrent(state: BankStateModel): Bank | null {
    return state.current;
  }

  @Selector()
  static isLoaded(state: BankStateModel): boolean {
    return state.isLoaded;
  }

  @Selector()
  static paginate(state: BankStateModel): PageEvent {
    return {
      pageSize: state.paginate.pageSize, 
      pageIndex: state.paginate.pageNo - 1,
      length: state.paginate.total
    };
  }

  @Action(FetchBankList)
  fetchBankList(
    ctx: StateContext<BankStateModel>,
     action: FetchBankList
  ): Observable<any> {
    const state = ctx.getState();

    this.uiStateSvc.setLoading(StateKey.BANK_UI, 
                               true);
    ctx.setState(BankStateConfigHelper.createDefault());

    return this.bankCtrlSvc
      .fetchAll(state.paginate, action.searchTerm)
      .pipe(
        tap(response => {
          ctx.dispatch([
            new SetBankList(response.banks),
            new UpdateBankPaginateTotal(response.meta.totalCount)
          ]);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.bank.listFetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setLoading(StateKey.BANK_UI, 
                                     false);
        }));
  }

  @Action(LoadBankList)
  loadBankList(ctx: StateContext<BankStateModel>): void {
    if (ctx.getState().isLoaded) return;
   
    ctx.dispatch(new FetchBankList());
  }

  @Action(SetBankList)
  setBankList(
    ctx: StateContext<BankStateModel>,
    action: SetBankList
  ): void {
    ctx.patchState({
      list: action.payload,
      isLoaded: true
    });
  }

  @Action(SetBankFilterTerms)
  setBankFilterTerms(
    ctx: StateContext<BankStateModel>,
    action: SetBankFilterTerms
  ): void {
    let isFiltered = false;
    
    if (!FilterHelper.isEmpty(action.payload)) {
      isFiltered = true;
    }

    ctx.patchState({ 
      filterTerms: action.payload,
      isFiltered: isFiltered
    });
  }

  @Action(ResetBankFilterTerms)
  resetBankFilterTerms(
    ctx: StateContext<BankStateModel>
  ): void {
    ctx.patchState({ 
      filterTerms: BankStateConfigHelper.createDefaultFilter()
    });
  }

  @Action(SetBankPaginate)
  setBankPaginate(
    ctx: StateContext<BankStateModel>,
    action: SetBankPaginate
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        pageNo: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize
      }
    });

    ctx.dispatch(new FetchBankList());
  }

  @Action(UpdateBankPaginateTotal)
  updateBankPaginateTotal(
    ctx: StateContext<BankStateModel>,
    action: UpdateBankPaginateTotal
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        total: action.payload
      }
    });
  }

  @Action(CreateBank)
  CreateBank(
    ctx: StateContext<BankStateModel>,
    action: CreateBank
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.BANK_UI, 
                                  true);
    return this.bankCtrlSvc.create(action.payload)
      .pipe(
        tap(response => {
          const state = ctx.getState();

          ctx.patchState({
            current: response.bank,
            list: [...state.list, response.bank],
            paginate: {
              ...state.paginate,
              total: state.paginate.total + 1
            }
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.bank.created);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.bank.creationFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.BANK_UI, 
                                        false);
        }));
  }

  @Action(UpdateBank)
  updateBank(
    ctx: StateContext<BankStateModel>,
    action: UpdateBank
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.BANK_UI, 
                                  true);
    return this.bankCtrlSvc.update(action.payload)
      .pipe(
        tap(response => {
          const state = ctx.getState();

          const updatedList = state.list.map(item => 
            item.id === response.bank.id ? response.bank : item);

          ctx.patchState({
            current: response.bank,
            list: updatedList
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.bank.updated);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.bank.updateFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.BANK_UI, 
                                        false);
        }));
  }

  @Action(DeleteBank)
  deleteBank(
    ctx: StateContext<BankStateModel>,
    action: DeleteBank
  ): Observable<any> {
    ctx.dispatch(new SetDeleteHandleProcessingStatus(true));

    return this.bankCtrlSvc.deleteById(action.id)
      .pipe(
        tap(_ => {
          const state = ctx.getState();

          const updatedList = state.list.filter(item => item.id !== action.id);
          
          ctx.patchState({
            list: updatedList,
            paginate: {
              ...state.paginate,
              total: state.paginate.total - 1
            }
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.bank.deleted);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.bank.deletionFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          ctx.dispatch(new SetDeleteHandleProcessingStatus(false));
        }));
  }

  @Action(CheckBankDeletable)
  checkBankDeletable(
    ctx: StateContext<BankStateModel>,
    action: CheckBankDeletable
  ): Observable<any> {
    return this.bankCtrlSvc.checkDeletable(action.id)
      .pipe(
        tap(deletableResponse => {
          ctx.dispatch(new SetDeletableResponse(deletableResponse.bank));
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.bank.deletionFailed);
          return EMPTY;
        }));
  }

  @Action(SelectBankById)
  selectBankById(
    ctx: StateContext<BankStateModel>,
    action: SelectBankById
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.BANK_UI, 
                                  true);
    return this.bankCtrlSvc.fetchById(action.id)
      .pipe(
        tap(response => {
          ctx.patchState({
            current: response.bank
          });
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.bank.fetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.BANK_UI, 
                                        false);
        }));
  }

  @Action(ResetSelectedBank)
  resetSelectedBank(
    ctx: StateContext<BankStateModel>
  ): void {
    ctx.patchState({ current: null });
  }

  @Action(ResetBankState)
  resetBankState(
    ctx: StateContext<BankStateModel>
  ): void {
    ctx.setState(BankStateConfigHelper.createDefault());
  }
}
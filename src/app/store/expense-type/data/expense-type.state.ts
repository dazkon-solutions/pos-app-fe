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
  ExpenseType, 
  ExpenseTypeFilterTerms 
} from "src/app/common/interfaces";
import { FilterHelper } from "src/app/common/helpers";
import { ExpenseTypeCtrlService } from "src/app/private/components";
import { LocaleKeys } from "src/app/common/constants";
import { 
  SetDeletableResponse, 
  SetDeleteHandleProcessingStatus 
} from "src/app/store/delete-handle";
import { ExpenseTypeStateModel } from "./expense-type-state.model";
import { StateKey } from "../../state-key.token";
import { ExpenseTypeStateConfigHelper } from "./expense-type-state-config.helper";
import { UIStateService } from "../../base-ui";
import { 
  AlertService, 
  AlertType 
} from "../../alerts";


export class FetchExpenseTypeList {
  static readonly type = '[Expense Type] Fetch';
  constructor(public searchTerm?: string) { }
}

export class LoadExpenseTypeList {
  static readonly type = '[Expense Type] Load list';
}

export class SetExpenseTypeList {
  static readonly type = '[Expense Type] Set list';
  constructor(public payload: ExpenseType[]) { }
}

export class SetExpenseTypeFilterTerms {
  static readonly type = '[Expense Type] Set filter terms';
  constructor(public payload: ExpenseTypeFilterTerms) { }
}

export class ResetExpenseTypeFilterTerms {
  static readonly type = '[Expense Type] Reset filter terms';
}

export class SetExpenseTypePaginate {
  static readonly type = '[Expense Type] Set paginate';
  constructor(public payload: PageEvent) { }
}

export class UpdateExpenseTypePaginateTotal {
  static readonly type = '[Expense Type] Update paginate total';
  constructor(public payload: number) { }
}

export class CreateExpenseType {
  static readonly type = '[Expense Type] Create';
  constructor(public payload: ExpenseType) { }
}

export class UpdateExpenseType {
  static readonly type = '[Expense Type] Update';
  constructor(public payload: ExpenseType) { }
}

export class DeleteExpenseType {
  static readonly type = '[Expense Type] Delete by';
  constructor(public id: number) { }
}

export class CheckExpenseTypeDeletable {
  static readonly type = '[Expense Type] Check deletable';
  constructor(public id: number) { }
}

export class SelectExpenseTypeById {
  static readonly type = '[Expense Type] Select by id';
  constructor(public id: number) { }
}

export class ResetSelectedExpenseType {
  static readonly type = '[Expense Type] Reset selected';
}

export class ResetExpenseTypeState {
  static readonly type = '[Expense Type] Reset state';
}

@State<ExpenseTypeStateModel>({
  name: StateKey.EXPENSE_TYPE,
  defaults: ExpenseTypeStateConfigHelper.createDefault()
})
@Injectable()
export class ExpenseTypeState {
  private expenseTypeCtrlSvc = inject(ExpenseTypeCtrlService);
  private uiStateSvc = inject(UIStateService);
  private alertSvc = inject(AlertService);

  @Selector()
  static getList(state: ExpenseTypeStateModel): ExpenseType[] {
    return state.list;
  }

  @Selector()
  static getCurrent(state: ExpenseTypeStateModel): ExpenseType | null {
    return state.current;
  }

  @Selector()
  static isLoaded(state: ExpenseTypeStateModel): boolean {
    return state.isLoaded;
  }

  @Selector()
  static paginate(state: ExpenseTypeStateModel): PageEvent {
    return {
      pageSize: state.paginate.pageSize, 
      pageIndex: state.paginate.pageNo - 1,
      length: state.paginate.total
    };
  }

  @Action(FetchExpenseTypeList)
  fetchExpenseTypeList(
    ctx: StateContext<ExpenseTypeStateModel>,
     action: FetchExpenseTypeList
  ): Observable<any> {
    const state = ctx.getState();

    this.uiStateSvc.setLoading(StateKey.EXPENSE_TYPE_UI, 
                               true);
    ctx.setState(ExpenseTypeStateConfigHelper.createDefault());

    return this.expenseTypeCtrlSvc
      .fetchAll(state.paginate, action.searchTerm)
      .pipe(
        tap(response => {
          ctx.dispatch([
            new SetExpenseTypeList(response.expenseTypes),
            new UpdateExpenseTypePaginateTotal(response.meta.totalCount)
          ]);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.expenseType.listFetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setLoading(StateKey.EXPENSE_TYPE_UI, 
                                     false);
        }));
  }

  @Action(LoadExpenseTypeList)
  loadExpenseTypeList(ctx: StateContext<ExpenseTypeStateModel>): void {
    if (ctx.getState().isLoaded) return;
   
    ctx.dispatch(new FetchExpenseTypeList());
  }

  @Action(SetExpenseTypeList)
  setExpenseTypeList(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: SetExpenseTypeList
  ): void {
    ctx.patchState({
      list: action.payload,
      isLoaded: true
    });
  }

  @Action(SetExpenseTypeFilterTerms)
  setExpenseTypeFilterTerms(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: SetExpenseTypeFilterTerms
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

  @Action(ResetExpenseTypeFilterTerms)
  resetExpenseTypeFilterTerms(
    ctx: StateContext<ExpenseTypeStateModel>
  ): void {
    ctx.patchState({ 
      filterTerms: ExpenseTypeStateConfigHelper.createDefaultFilter()
    });
  }

  @Action(SetExpenseTypePaginate)
  setExpenseTypePaginate(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: SetExpenseTypePaginate
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        pageNo: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize
      }
    });

    ctx.dispatch(new FetchExpenseTypeList());
  }

  @Action(UpdateExpenseTypePaginateTotal)
  updateExpenseTypePaginateTotal(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: UpdateExpenseTypePaginateTotal
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        total: action.payload
      }
    });
  }

  @Action(CreateExpenseType)
  CreateExpenseType(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: CreateExpenseType
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.EXPENSE_TYPE_UI, 
                                  true);
    return this.expenseTypeCtrlSvc.create(action.payload)
      .pipe(
        tap(response => {
          const state = ctx.getState();

          ctx.patchState({
            current: response.expenseType,
            list: [...state.list, response.expenseType],
            paginate: {
              ...state.paginate,
              total: state.paginate.total + 1
            }
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.expenseType.created);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.expenseType.creationFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.EXPENSE_TYPE_UI, 
                                        false);
        }));
  }

  @Action(UpdateExpenseType)
  updateExpenseType(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: UpdateExpenseType
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.EXPENSE_TYPE_UI, 
                                  true);
    return this.expenseTypeCtrlSvc.update(action.payload)
      .pipe(
        tap(response => {
          const state = ctx.getState();

          const updatedList = state.list.map(item => 
            item.id === response.expenseType.id ? response.expenseType : item);

          ctx.patchState({
            current: response.expenseType,
            list: updatedList
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.expenseType.updated);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.expenseType.updateFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.EXPENSE_TYPE_UI, 
                                        false);
        }));
  }

  @Action(DeleteExpenseType)
  deleteExpenseType(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: DeleteExpenseType
  ): Observable<any> {
    ctx.dispatch(new SetDeleteHandleProcessingStatus(true));

    return this.expenseTypeCtrlSvc.deleteById(action.id)
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
                                 LocaleKeys.alerts.success.expenseType.deleted);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.expenseType.deletionFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          ctx.dispatch(new SetDeleteHandleProcessingStatus(false));
        }));
  }

  @Action(CheckExpenseTypeDeletable)
  checkExpenseTypeDeletable(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: CheckExpenseTypeDeletable
  ): Observable<any> {
    return this.expenseTypeCtrlSvc.checkDeletable(action.id)
      .pipe(
        tap(deletableResponse => {
          ctx.dispatch(new SetDeletableResponse(deletableResponse.expenseType));
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.expenseType.deletionFailed);
          return EMPTY;
        }));
  }

  @Action(SelectExpenseTypeById)
  selectExpenseTypeById(
    ctx: StateContext<ExpenseTypeStateModel>,
    action: SelectExpenseTypeById
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.EXPENSE_TYPE_UI, 
                                  true);
    return this.expenseTypeCtrlSvc.fetchById(action.id)
      .pipe(
        tap(response => {
          ctx.patchState({
            current: response.expenseType
          });
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.expenseType.fetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.EXPENSE_TYPE_UI, 
                                        false);
        }));
  }

  @Action(ResetSelectedExpenseType)
  resetSelectedExpenseType(
    ctx: StateContext<ExpenseTypeStateModel>
  ): void {
    ctx.patchState({ current: null });
  }

  @Action(ResetExpenseTypeState)
  resetExpenseTypeState(
    ctx: StateContext<ExpenseTypeStateModel>
  ): void {
    ctx.setState(ExpenseTypeStateConfigHelper.createDefault());
  }
}
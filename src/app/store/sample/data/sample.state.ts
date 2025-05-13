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
  tap 
} from "rxjs";
import { FilterHelper } from "src/app/common/helpers";
import { LocaleKeys } from "src/app/common/constants";
import { 
  SetDeletableResponse, 
  SetDeleteHandleProcessingStatus 
} from "src/app/store/delete-handle";
import { SampleStateModel } from "./sample-state.model";
import { StateKey } from "../../state-key.token";
import { SampleStateConfigHelper } from "./sample-state-config.helper";
import { UIStateService } from "../../base-ui";
import { 
  AlertService, 
  AlertType 
} from "../../alerts";
import { SampleCtrlService } from "src/app/private/components";


export class FetchSampleList {
  static readonly type = '[Sample] Fetch';
}

export class LoadSampleList {
  static readonly type = '[Sample] Load list';
}

export class SetSampleList {
  static readonly type = '[Sample] Set list';
  constructor(public payload: any[]) { }
}

export class SetSampleFilterTerms {
  static readonly type = '[Sample] Set filter terms';
  constructor(public payload: any) { }
}

export class ResetSampleFilterTerms {
  static readonly type = '[Sample] Reset filter terms';
}

export class SetSamplePaginate {
  static readonly type = '[Sample] Set paginate';
  constructor(public payload: PageEvent) { }
}

export class UpdateSamplePaginateTotal {
  static readonly type = '[Sample] Update paginate total';
  constructor(public payload: number) { }
}

export class CreateSample {
  static readonly type = '[Sample] Create';
  constructor(public payload: any) { }
}

export class UpdateSample {
  static readonly type = '[Sample] Update';
  constructor(public payload: any) { }
}

export class DeleteSample {
  static readonly type = '[Sample] Delete by';
  constructor(public id: number) { }
}

export class CheckSampleDeletable {
  static readonly type = '[Sample] Check deletable';
  constructor(public id: number) { }
}

export class SelectSampleById {
  static readonly type = '[Sample] Select by id';
  constructor(public id: number) { }
}

export class ResetSelectedSample {
  static readonly type = '[Sample] Reset selected';
}

export class ResetSampleState {
  static readonly type = '[Sample] Reset state';
}

@State<SampleStateModel>({
  name: StateKey.SAMPLE,
  defaults: SampleStateConfigHelper.createDefault()
})
@Injectable()
export class SampleState {
  private sampleCtrlSvc = inject(SampleCtrlService);
  private uiStateSvc = inject(UIStateService);
  private alertSvc = inject(AlertService);

  @Selector()
  static getList(state: SampleStateModel): any[] {
    return state.list;
  }

  @Selector()
  static getCurrent(state: SampleStateModel): any | null {
    return state.current;
  }

  @Selector()
  static isLoaded(state: SampleStateModel): boolean {
    return state.isLoaded;
  }

  @Selector()
  static paginate(state: SampleStateModel): PageEvent {
    return {
      pageSize: state.paginate.pageSize, 
      pageIndex: state.paginate.pageNo - 1,
      length: state.paginate.total
    };
  }

  @Action(FetchSampleList)
  fetchSampleList(
    ctx: StateContext<SampleStateModel>
  ): Observable<any> {
    const state = ctx.getState();

    this.uiStateSvc.setLoading(StateKey.SAMPLE_UI, 
                               true);
    ctx.setState(SampleStateConfigHelper.createDefault());

    return this.sampleCtrlSvc
      .fetchAll(state.paginate, state.filterTerms)
      .pipe(
        tap(samples => {
          ctx.dispatch([
            new SetSampleList(samples.data),
            new UpdateSamplePaginateTotal(samples.total)
          ]);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.sampleListFetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setLoading(StateKey.SAMPLE_UI, 
                                     false);
        }));
  }

  @Action(LoadSampleList)
  loadSampleList(ctx: StateContext<SampleStateModel>): void {
    if (ctx.getState().isLoaded) return;
   
    ctx.dispatch(new FetchSampleList());
  }

  @Action(SetSampleList)
  setSampleList(
    ctx: StateContext<SampleStateModel>,
    action: SetSampleList
  ): void {
    ctx.patchState({
      list: action.payload,
      isLoaded: true
    });
  }

  @Action(SetSampleFilterTerms)
  setSampleFilterTerms(
    ctx: StateContext<SampleStateModel>,
    action: SetSampleFilterTerms
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

  @Action(ResetSampleFilterTerms)
  resetSampleFilterTerms(
    ctx: StateContext<SampleStateModel>
  ): void {
    ctx.patchState({ 
      filterTerms: SampleStateConfigHelper.createDefaultFilter()
    });
  }

  @Action(SetSamplePaginate)
  setSamplePaginate(
    ctx: StateContext<SampleStateModel>,
    action: SetSamplePaginate
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        pageNo: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize
      }
    });
  }

  @Action(UpdateSamplePaginateTotal)
  updateSamplePaginateTotal(
    ctx: StateContext<SampleStateModel>,
    action: UpdateSamplePaginateTotal
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        total: action.payload
      }
    });
  }

  @Action(CreateSample)
  CreateSample(
    ctx: StateContext<SampleStateModel>,
    action: CreateSample
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.SAMPLE_UI, 
                                  true);
    return this.sampleCtrlSvc.create(action.payload)
      .pipe(
        tap(sample => {
          const state = ctx.getState();

          ctx.patchState({
            current: sample,
            list: [...state.list, sample]
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.sampleCreated);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.sampleCreationFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.SAMPLE_UI, 
                                        false);
        }));
  }

  @Action(UpdateSample)
  updateSample(
    ctx: StateContext<SampleStateModel>,
    action: UpdateSample
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.SAMPLE_UI, 
                                  true);
    return this.sampleCtrlSvc.update(action.payload)
      .pipe(
        tap(sample => {
          const state = ctx.getState();

          const updatedList = state.list.map(item => 
            item.id === sample.id ? sample : item);

          ctx.patchState({
            current: sample,
            list: updatedList
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.sampleUpdated);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.sampleUpdateFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.SAMPLE_UI, 
                                        false);
        }));
  }

  @Action(DeleteSample)
  deleteSample(
    ctx: StateContext<SampleStateModel>,
    action: DeleteSample
  ): Observable<any> {
    ctx.dispatch(new SetDeleteHandleProcessingStatus(true));

    return this.sampleCtrlSvc.deleteById(action.id)
      .pipe(
        tap(_ => {
          const state = ctx.getState();

          const updatedList = state.list.filter(item => item.id !== action.id);
          
          ctx.patchState({
            list: updatedList
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.sampleDeleted);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.sampleDeletionFailed);
          return EMPTY;
        }),
        finalize(() => {
          ctx.dispatch(new SetDeleteHandleProcessingStatus(false));
        }));
  }

  @Action(CheckSampleDeletable)
  checkSampleDeletable(
    ctx: StateContext<SampleStateModel>,
    action: CheckSampleDeletable
  ): Observable<any> {
    return this.sampleCtrlSvc.isDeletable(action.id)
      .pipe(
        tap(deletableResponse => {
          ctx.dispatch(new SetDeletableResponse(deletableResponse));
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.sampleDeletionFailed);
          return EMPTY;
        }));
  }

  @Action(SelectSampleById)
  selectSampleById(
    ctx: StateContext<SampleStateModel>,
    action: SelectSampleById
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.SAMPLE_UI, 
                                  true);
    return this.sampleCtrlSvc.fetchById(action.id)
      .pipe(
        tap(sample => {
          ctx.patchState({
            current: sample
          });
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.sampleFetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.SAMPLE_UI, 
                                        false);
        }));
  }

  @Action(ResetSelectedSample)
  resetSelectedSample(
    ctx: StateContext<SampleStateModel>
  ): void {
    ctx.patchState({ current: null });
  }

  @Action(ResetSampleState)
  resetSampleState(
    ctx: StateContext<SampleStateModel>
  ): void {
    ctx.setState(SampleStateConfigHelper.createDefault());
  }
}
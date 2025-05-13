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
  ProductBrand, 
  ProductBrandFilterTerms 
} from "src/app/common/interfaces";
import { FilterHelper } from "src/app/common/helpers";
import { ProductBrandCtrlService } from "src/app/private/components";
import { LocaleKeys } from "src/app/common/constants";
import { 
  SetDeletableResponse, 
  SetDeleteHandleProcessingStatus 
} from "src/app/store/delete-handle";
import { ProductBrandStateModel } from "./product-brand-state.model";
import { StateKey } from "../../state-key.token";
import { ProductBrandStateConfigHelper } from "./product-brand-state-config.helper";
import { UIStateService } from "../../base-ui";
import { 
  AlertService, 
  AlertType 
} from "../../alerts";


export class FetchProductBrandList {
  static readonly type = '[Product brand] Fetch';
  constructor(public searchTerm?: string) { }
}

export class LoadProductBrandList {
  static readonly type = '[Product brand] Load list';
}

export class SetProductBrandList {
  static readonly type = '[Product brand] Set list';
  constructor(public payload: ProductBrand[]) { }
}

export class SetProductBrandFilterTerms {
  static readonly type = '[Product brand] Set filter terms';
  constructor(public payload: ProductBrandFilterTerms) { }
}

export class ResetProductBrandFilterTerms {
  static readonly type = '[Product brand] Reset filter terms';
}

export class SetProductBrandPaginate {
  static readonly type = '[Product brand] Set paginate';
  constructor(public payload: PageEvent) { }
}

export class UpdateProductBrandPaginateTotal {
  static readonly type = '[Product brand] Update paginate total';
  constructor(public payload: number) { }
}

export class CreateProductBrand {
  static readonly type = '[Product brand] Create';
  constructor(public payload: ProductBrand) { }
}

export class UpdateProductBrand {
  static readonly type = '[Product brand] Update';
  constructor(public payload: ProductBrand) { }
}

export class DeleteProductBrand {
  static readonly type = '[Product brand] Delete by';
  constructor(public id: number) { }
}

export class CheckProductBrandDeletable {
  static readonly type = '[Product brand] Check deletable';
  constructor(public id: number) { }
}

export class SelectProductBrandById {
  static readonly type = '[Product brand] Select by id';
  constructor(public id: number) { }
}

export class ResetSelectedProductBrand {
  static readonly type = '[Product brand] Reset selected';
}

export class ResetProductBrandState {
  static readonly type = '[Product brand] Reset state';
}

@State<ProductBrandStateModel>({
  name: StateKey.PRODUCT_BRAND,
  defaults: ProductBrandStateConfigHelper.createDefault()
})
@Injectable()
export class ProductBrandState {
  private productBrandCtrlSvc = inject(ProductBrandCtrlService);
  private uiStateSvc = inject(UIStateService);
  private alertSvc = inject(AlertService);

  @Selector()
  static getList(state: ProductBrandStateModel): ProductBrand[] {
    return state.list;
  }

  @Selector()
  static getCurrent(state: ProductBrandStateModel): ProductBrand | null {
    return state.current;
  }

  @Selector()
  static isLoaded(state: ProductBrandStateModel): boolean {
    return state.isLoaded;
  }

  @Selector()
  static paginate(state: ProductBrandStateModel): PageEvent {
    return {
      pageSize: state.paginate.pageSize, 
      pageIndex: state.paginate.pageNo - 1,
      length: state.paginate.total
    };
  }

  @Action(FetchProductBrandList)
  fetchProductBrandList(
    ctx: StateContext<ProductBrandStateModel>,
     action: FetchProductBrandList
  ): Observable<any> {
    const state = ctx.getState();

    this.uiStateSvc.setLoading(StateKey.PRODUCT_BRAND_UI, 
                               true);
    ctx.setState(ProductBrandStateConfigHelper.createDefault());

    return this.productBrandCtrlSvc
      .fetchAll(state.paginate, action.searchTerm)
      .pipe(
        tap(response => {
          ctx.dispatch([
            new SetProductBrandList(response.brands),
            new UpdateProductBrandPaginateTotal(response.meta.totalCount)
          ]);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.brand.listFetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setLoading(StateKey.PRODUCT_BRAND_UI, 
                                     false);
        }));
  }

  @Action(LoadProductBrandList)
  loadProductBrandList(ctx: StateContext<ProductBrandStateModel>): void {
    if (ctx.getState().isLoaded) return;
   
    ctx.dispatch(new FetchProductBrandList());
  }

  @Action(SetProductBrandList)
  setProductBrandList(
    ctx: StateContext<ProductBrandStateModel>,
    action: SetProductBrandList
  ): void {
    ctx.patchState({
      list: action.payload,
      isLoaded: true
    });
  }

  @Action(SetProductBrandFilterTerms)
  setProductBrandFilterTerms(
    ctx: StateContext<ProductBrandStateModel>,
    action: SetProductBrandFilterTerms
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

  @Action(ResetProductBrandFilterTerms)
  resetProductBrandFilterTerms(
    ctx: StateContext<ProductBrandStateModel>
  ): void {
    ctx.patchState({ 
      filterTerms: ProductBrandStateConfigHelper.createDefaultFilter()
    });
  }

  @Action(SetProductBrandPaginate)
  setProductBrandPaginate(
    ctx: StateContext<ProductBrandStateModel>,
    action: SetProductBrandPaginate
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        pageNo: action.payload.pageIndex + 1,
        pageSize: action.payload.pageSize
      }
    });

    ctx.dispatch(new FetchProductBrandList());
  }

  @Action(UpdateProductBrandPaginateTotal)
  updateProductBrandPaginateTotal(
    ctx: StateContext<ProductBrandStateModel>,
    action: UpdateProductBrandPaginateTotal
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        total: action.payload
      }
    });
  }

  @Action(CreateProductBrand)
  CreateProductBrand(
    ctx: StateContext<ProductBrandStateModel>,
    action: CreateProductBrand
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.PRODUCT_BRAND_UI, 
                                  true);
    return this.productBrandCtrlSvc.create(action.payload)
      .pipe(
        tap(response => {
          const state = ctx.getState();

          ctx.patchState({
            current: response.brand,
            list: [...state.list, response.brand],
            paginate: {
              ...state.paginate,
              total: state.paginate.total + 1
            }
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.brand.created);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.brand.creationFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.PRODUCT_BRAND_UI, 
                                        false);
        }));
  }

  @Action(UpdateProductBrand)
  updateProductBrand(
    ctx: StateContext<ProductBrandStateModel>,
    action: UpdateProductBrand
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.PRODUCT_BRAND_UI, 
                                  true);
    return this.productBrandCtrlSvc.update(action.payload)
      .pipe(
        tap(response => {
          const state = ctx.getState();

          const updatedList = state.list.map(item => 
            item.id === response.brand.id ? response.brand : item);

          ctx.patchState({
            current: response.brand,
            list: updatedList
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.brand.updated);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.brand.updateFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.PRODUCT_BRAND_UI, 
                                        false);
        }));
  }

  @Action(DeleteProductBrand)
  deleteProductBrand(
    ctx: StateContext<ProductBrandStateModel>,
    action: DeleteProductBrand
  ): Observable<any> {
    ctx.dispatch(new SetDeleteHandleProcessingStatus(true));

    return this.productBrandCtrlSvc.deleteById(action.id)
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
                                 LocaleKeys.alerts.success.brand.deleted);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.brand.deletionFailed);
          return throwError(() => error);
        }),
        finalize(() => {
          ctx.dispatch(new SetDeleteHandleProcessingStatus(false));
        }));
  }

  @Action(CheckProductBrandDeletable)
  checkProductBrandDeletable(
    ctx: StateContext<ProductBrandStateModel>,
    action: CheckProductBrandDeletable
  ): Observable<any> {
    return this.productBrandCtrlSvc.checkDeletable(action.id)
      .pipe(
        tap(deletableResponse => {
          ctx.dispatch(new SetDeletableResponse(deletableResponse.brand));
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.brand.deletionFailed);
          return EMPTY;
        }));
  }

  @Action(SelectProductBrandById)
  selectProductBrandById(
    ctx: StateContext<ProductBrandStateModel>,
    action: SelectProductBrandById
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.PRODUCT_BRAND_UI, 
                                  true);
    return this.productBrandCtrlSvc.fetchById(action.id)
      .pipe(
        tap(response => {
          ctx.patchState({
            current: response.brand
          });
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.brand.fetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.PRODUCT_BRAND_UI, 
                                        false);
        }));
  }

  @Action(ResetSelectedProductBrand)
  resetSelectedProductBrand(
    ctx: StateContext<ProductBrandStateModel>
  ): void {
    ctx.patchState({ current: null });
  }

  @Action(ResetProductBrandState)
  resetProductBrandState(
    ctx: StateContext<ProductBrandStateModel>
  ): void {
    ctx.setState(ProductBrandStateConfigHelper.createDefault());
  }
}
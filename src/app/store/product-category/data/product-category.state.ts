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
import { 
  ProductCategory, 
  ProductCategoryFilterTerms 
} from "src/app/common/interfaces";
import { FilterHelper } from "src/app/common/helpers";
import { ProductCategoryCtrlService } from "src/app/private/components";
import { LocaleKeys } from "src/app/common/constants";
import { 
  SetDeletableResponse, 
  SetDeleteHandleProcessingStatus 
} from "src/app/store/delete-handle";
import { ProductCategoryStateModel } from "./product-category-state.model";
import { StateKey } from "../../state-key.token";
import { ProductCategoryStateConfigHelper } from "./product-category-state-config.helper";
import { UIStateService } from "../../base-ui";
import { 
  AlertService, 
  AlertType 
} from "../../alerts";


export class FetchProductCategoryList {
  static readonly type = '[Product category] Fetch';
}

export class LoadProductCategoryList {
  static readonly type = '[Product category] Load list';
}

export class SetProductCategoryList {
  static readonly type = '[Product category] Set list';
  constructor(public payload: ProductCategory[]) { }
}

export class SetProductCategoryFilterTerms {
  static readonly type = '[Product category] Set filter terms';
  constructor(public payload: ProductCategoryFilterTerms) { }
}

export class ResetProductCategoryFilterTerms {
  static readonly type = '[Product category] Reset filter terms';
}

export class SetProductCategoryPaginate {
  static readonly type = '[Product category] Set paginate';
  constructor(public payload: PageEvent) { }
}

export class UpdateProductCategoryPaginateTotal {
  static readonly type = '[Product category] Update paginate total';
  constructor(public payload: number) { }
}

export class CreateProductCategory {
  static readonly type = '[Product category] Create';
  constructor(public payload: ProductCategory) { }
}

export class UpdateProductCategory {
  static readonly type = '[Product category] Update';
  constructor(public payload: ProductCategory) { }
}

export class DeleteProductCategory {
  static readonly type = '[Product category] Delete by';
  constructor(public id: number) { }
}

export class CheckProductCategoryDeletable {
  static readonly type = '[Product category] Check deletable';
  constructor(public id: number) { }
}

export class SelectProductCategoryById {
  static readonly type = '[Product category] Select by id';
  constructor(public id: number) { }
}

export class ResetSelectedProductCategory {
  static readonly type = '[Product category] Reset selected';
}

export class ResetProductCategoryState {
  static readonly type = '[Product category] Reset state';
}

@State<ProductCategoryStateModel>({
  name: StateKey.PRODUCT_CATEGORY,
  defaults: ProductCategoryStateConfigHelper.createDefault()
})
@Injectable()
export class ProductCategoryState {
  private productCategoryCtrlSvc = inject(ProductCategoryCtrlService);
  private uiStateSvc = inject(UIStateService);
  private alertSvc = inject(AlertService);

  @Selector()
  static getList(state: ProductCategoryStateModel): ProductCategory[] {
    return state.list;
  }

  @Selector()
  static getCurrent(state: ProductCategoryStateModel): ProductCategory | null {
    return state.current;
  }

  @Selector()
  static isLoaded(state: ProductCategoryStateModel): boolean {
    return state.isLoaded;
  }

  @Selector()
  static paginate(state: ProductCategoryStateModel): PageEvent {
    return {
      pageSize: state.paginate.pageSize, 
      pageIndex: state.paginate.pageNo - 1,
      length: state.paginate.total
    };
  }

  @Action(FetchProductCategoryList)
  fetchProductCategoryList(
    ctx: StateContext<ProductCategoryStateModel>
  ): Observable<any> {
    const state = ctx.getState();

    this.uiStateSvc.setLoading(StateKey.PRODUCT_CATEGORY_UI, 
                               true);
    ctx.setState(ProductCategoryStateConfigHelper.createDefault());

    return this.productCategoryCtrlSvc
      .fetchAll(state.paginate, state.filterTerms)
      .pipe(
        tap(categories => {
          ctx.dispatch([
            new SetProductCategoryList(categories.data),
            new UpdateProductCategoryPaginateTotal(categories.total)
          ]);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.categoryListFetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setLoading(StateKey.PRODUCT_CATEGORY_UI, 
                                     false);
        }));
  }

  @Action(LoadProductCategoryList)
  loadProductCategoryList(ctx: StateContext<ProductCategoryStateModel>): void {
    if (ctx.getState().isLoaded) return;
   
    ctx.dispatch(new FetchProductCategoryList());
  }

  @Action(SetProductCategoryList)
  setProductCategoryList(
    ctx: StateContext<ProductCategoryStateModel>,
    action: SetProductCategoryList
  ): void {
    ctx.patchState({
      list: action.payload,
      isLoaded: true
    });
  }

  @Action(SetProductCategoryFilterTerms)
  setProductCategoryFilterTerms(
    ctx: StateContext<ProductCategoryStateModel>,
    action: SetProductCategoryFilterTerms
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

  @Action(ResetProductCategoryFilterTerms)
  resetProductCategoryFilterTerms(
    ctx: StateContext<ProductCategoryStateModel>
  ): void {
    ctx.patchState({ 
      filterTerms: ProductCategoryStateConfigHelper.createDefaultFilter()
    });
  }

  @Action(SetProductCategoryPaginate)
  setProductCategoryPaginate(
    ctx: StateContext<ProductCategoryStateModel>,
    action: SetProductCategoryPaginate
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

  @Action(UpdateProductCategoryPaginateTotal)
  updateProductCategoryPaginateTotal(
    ctx: StateContext<ProductCategoryStateModel>,
    action: UpdateProductCategoryPaginateTotal
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      paginate: {
        ...state.paginate,
        total: action.payload
      }
    });
  }

  @Action(CreateProductCategory)
  CreateProductCategory(
    ctx: StateContext<ProductCategoryStateModel>,
    action: CreateProductCategory
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.PRODUCT_CATEGORY_UI, 
                                  true);
    return this.productCategoryCtrlSvc.create(action.payload)
      .pipe(
        tap(category => {
          const state = ctx.getState();

          ctx.patchState({
            current: category,
            list: [...state.list, category]
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.categoryCreated);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.categoryCreationFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.PRODUCT_CATEGORY_UI, 
                                        false);
        }));
  }

  @Action(UpdateProductCategory)
  updateProductCategory(
    ctx: StateContext<ProductCategoryStateModel>,
    action: UpdateProductCategory
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.PRODUCT_CATEGORY_UI, 
                                  true);
    return this.productCategoryCtrlSvc.update(action.payload)
      .pipe(
        tap(category => {
          const state = ctx.getState();

          const updatedList = state.list.map(item => 
            item.id === category.id ? category : item);

          ctx.patchState({
            current: category,
            list: updatedList
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.categoryUpdated);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.categoryUpdateFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.PRODUCT_CATEGORY_UI, 
                                        false);
        }));
  }

  @Action(DeleteProductCategory)
  deleteProductCategory(
    ctx: StateContext<ProductCategoryStateModel>,
    action: DeleteProductCategory
  ): Observable<any> {
    ctx.dispatch(new SetDeleteHandleProcessingStatus(true));

    return this.productCategoryCtrlSvc.deleteById(action.id)
      .pipe(
        tap(_ => {
          const state = ctx.getState();

          const updatedList = state.list.filter(item => item.id !== action.id);
          
          ctx.patchState({
            list: updatedList
          });

          this.alertSvc.setAlert(AlertType.SUCCESS, 
                                 LocaleKeys.alerts.success.categoryDeleted);
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.categoryDeletionFailed);
          return EMPTY;
        }),
        finalize(() => {
          ctx.dispatch(new SetDeleteHandleProcessingStatus(false));
        }));
  }

  @Action(CheckProductCategoryDeletable)
  checkProductCategoryDeletable(
    ctx: StateContext<ProductCategoryStateModel>,
    action: CheckProductCategoryDeletable
  ): Observable<any> {
    return this.productCategoryCtrlSvc.isDeletable(action.id)
      .pipe(
        tap(deletableResponse => {
          ctx.dispatch(new SetDeletableResponse(deletableResponse));
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.categoryDeletionFailed);
          return EMPTY;
        }));
  }

  @Action(SelectProductCategoryById)
  selectProductCategoryById(
    ctx: StateContext<ProductCategoryStateModel>,
    action: SelectProductCategoryById
  ): Observable<any> {
    this.uiStateSvc.setProcessing(StateKey.PRODUCT_CATEGORY_UI, 
                                  true);
    return this.productCategoryCtrlSvc.fetchById(action.id)
      .pipe(
        tap(category => {
          ctx.patchState({
            current: category
          });
        }),
        catchError((error) => {
          console.error(error);
          this.alertSvc.setAlert(AlertType.ERROR, 
                                 LocaleKeys.alerts.failed.categoryFetchFailed);
          return EMPTY;
        }),
        finalize(() => {
          this.uiStateSvc.setProcessing(StateKey.PRODUCT_CATEGORY_UI, 
                                        false);
        }));
  }

  @Action(ResetSelectedProductCategory)
  resetSelectedProductCategory(
    ctx: StateContext<ProductCategoryStateModel>
  ): void {
    ctx.patchState({ current: null });
  }

  @Action(ResetProductCategoryState)
  resetProductCategoryState(
    ctx: StateContext<ProductCategoryStateModel>
  ): void {
    ctx.setState(ProductCategoryStateConfigHelper.createDefault());
  }
}
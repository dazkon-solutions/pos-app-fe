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
  FetchProductCategoryList, 
  LoadProductCategoryList, 
  ProductCategoryState, 
  ProductCategoryUIState, 
  ResetProductCategoryState, 
  SelectProductCategoryById, 
  SetProductCategoryPaginate 
} from 'src/app/store/product-category';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CategoryService } from './category.service';
import { CategoriesGridComponent } from './categories-grid/categories-grid.component';


@Component({
  selector: 'daz-categories',
  imports: [
    CORE_IMPORTS,
    ScrollingModule,
    CategoriesTableComponent,
    CategoriesGridComponent,
    ViewTogglePaginationComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements 
  OnInit, 
  OnDestroy
{
  private store = inject(Store);
  private actionSvc = inject(ActionService);
  private service = inject(CategoryService);

  isListView = this.store.selectSignal(ProductCategoryUIState.isListView);
  isLoading = this.store.selectSignal(ProductCategoryUIState.isLoading);
  pagination = this.store.selectSignal(ProductCategoryState.paginate);
  dataSource = this.store.selectSignal(ProductCategoryState.getList);

  private readonly resource = Resource.CATEGORIES;
  
  constructor() { 
    effect(() => this.handleAction(this.actionSvc.action()));
  }

  ngOnInit(): void {
    this.store.dispatch([
      new SetResource(this.resource),
      new LoadProductCategoryList(),
    ]);
  }

  private handleAction(response: ActionResponse): void {
    if (response.action === Action.DEFAULT) return;

    switch (response.action) {
      case Action.OPEN_FORM_DIALOG:
        if (response.payload.id) {
          this.store.dispatch(new SelectProductCategoryById(response.payload.id));
        }
        this.service.openForm();
        break;
      case Action.DELETE_ITEM:
        this.service.delete(response.payload);
        break;
      case Action.PERFORM_MAIN_SEARCH:
        this.store.dispatch(new FetchProductCategoryList(response.payload));
        break;
      default:
        console.warn('Unhandled action:', response.action);
    }

    this.actionSvc.resetAction();
  }

  viewToggled(): void {
    this.store.dispatch(new ToggleView(StateKey.PRODUCT_CATEGORY_UI));
  }

  paginationChanged(pageEvent: PageEvent): void {
    this.store.dispatch(new SetProductCategoryPaginate(pageEvent));
  }

  refreshData(): void {
    this.store.dispatch(new FetchProductCategoryList());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetProductCategoryState());
  }
}
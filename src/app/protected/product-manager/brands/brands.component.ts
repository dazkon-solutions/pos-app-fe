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
  FetchProductBrandList, 
  LoadProductBrandList, 
  ProductBrandState, 
  ProductBrandUIState, 
  ResetProductBrandState, 
  SelectProductBrandById,
  SetProductBrandPaginate
} from 'src/app/store/product-brand';
import { BrandsTableComponent } from './brands-table/brands-table.component';
import { BrandService } from './brand.service';
import { BrandsGridComponent } from './brands-grid/brands-grid.component';


@Component({
  selector: 'daz-brands',
  imports: [
    CORE_IMPORTS,
    ScrollingModule,
    BrandsTableComponent,
    BrandsGridComponent,
    ViewTogglePaginationComponent
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandsComponent implements 
  OnInit, 
  OnDestroy
{
  private store = inject(Store);
  private actionSvc = inject(ActionService);
  private service = inject(BrandService);

  isListView = this.store.selectSignal(ProductBrandUIState.isListView);
  isLoading = this.store.selectSignal(ProductBrandUIState.isLoading);
  pagination = this.store.selectSignal(ProductBrandState.paginate);
  dataSource = this.store.selectSignal(ProductBrandState.getList);

  private readonly resource = Resource.BRANDS;
  
  constructor() { 
    effect(() => this.handleAction(this.actionSvc.action()));
  }

  ngOnInit(): void {
    this.store.dispatch([
      new SetResource(this.resource),
      new LoadProductBrandList(),
    ]);
  }

  private handleAction(response: ActionResponse): void {
    if (response.action === Action.DEFAULT) return;

    switch (response.action) {
      case Action.OPEN_FORM_DIALOG:
        if (response.payload.id) {
          this.store.dispatch(new SelectProductBrandById(response.payload.id));
        }
        this.service.openForm();
        break;
      case Action.DELETE_ITEM:
        this.service.delete(response.payload);
        break;
      case Action.PERFORM_MAIN_SEARCH:
        this.store.dispatch(new FetchProductBrandList(response.payload));
        break;
      default:
        console.warn('Unhandled action:', response.action);
    }

    this.actionSvc.resetAction();
  }

  viewToggled(): void {
    this.store.dispatch(new ToggleView(StateKey.PRODUCT_BRAND_UI));
  }

  paginationChanged(pageEvent: PageEvent): void {
    this.store.dispatch(new SetProductBrandPaginate(pageEvent));
  }

  refreshData(): void {
    this.store.dispatch(new FetchProductBrandList());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetProductBrandState());
  }
}
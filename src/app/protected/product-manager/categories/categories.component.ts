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
  DestroyRef, 
  OnInit 
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { 
  BehaviorSubject, 
  Observable
} from 'rxjs';
import { Store } from '@ngxs/store';
import { PageEvent } from '@angular/material/paginator';
import { CATEGORY_MAT_IMPORTS } from './category-imports';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionResponse } from 'src/app/common/interfaces';
import { Action } from 'src/app/common/enums';
import { ProductCategoryUIState } from 'src/app/store/product-category';
import { ActionService } from 'src/app/common/services';
import { ViewTogglePaginationComponent } from 'src/app/private/system/common/view-toggle-pagination/view-toggle-pagination.component';
import { ToggleView 
} from 'src/app/store/base-ui';
import { StateKey } from 'src/app/store/state-key.token';
import { 
  FetchProductCategoryList, 
  LoadProductCategoryList 
} from 'src/app/store/product-category/data/product-category.state';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CategoriesGridComponent } from './categories-grid/categories-grid.component';
import { CategoryService } from './category.service';


interface PeriodicElement {
  photo: string;
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'daz-categories',
  imports: [
    CORE_IMPORTS,
    CATEGORY_MAT_IMPORTS,
    CategoriesTableComponent,
    CategoriesGridComponent,
    ViewTogglePaginationComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  isListView$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  dataSource$ = new BehaviorSubject<PeriodicElement[]>([]);
  pagination$!: Observable<PageEvent>;

  constructor(
    private destroyRef: DestroyRef,
    private store: Store,
    private actionSvc: ActionService,
    private service: CategoryService
  ) { }

  ngOnInit(): void {
    this.subscribeToActions();
    this.syncState();
    
    this.dataSource$.next(this.dataSource);

    this.store.dispatch(new LoadProductCategoryList())
  }

  private subscribeToActions(): void {
    this.actionSvc.action$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(action => this.handleAction(action));
  }

  private syncState(): void {
    this.isListView$ = this.store.select(ProductCategoryUIState.isListView);
    this.isLoading$ = this.store.select(ProductCategoryUIState.isLoading);
  }

  private dataSource: PeriodicElement[] = [
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U' ,id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 22, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 23, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 25, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 26, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 31, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 32, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 33, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 34, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 35, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 36, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 37, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 38, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 39, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,id: 40, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  private handleAction(actionResponse: ActionResponse) {
    switch (actionResponse.action) {
      case Action.OPEN_ADVANCED_FILTER:
        this.service.openFilter();
        break;
      case Action.CREATE_CATEGORY:
        this.service.openForm();
        break;
      case Action.VIEW_CATEGORY:
        this.service.openForm();
        console.warn(actionResponse);
        break;
      case Action.DELETE_CATEGORY:
        this.service.delete(actionResponse.payload);
        break;
      default:
        console.warn('Unhandled action:', actionResponse.action);
    }
  }

  viewToggled(): void {
    this.store.dispatch(new ToggleView(StateKey.PRODUCT_CATEGORY_UI));
  }

  paginationChanged(page: PageEvent): void {
    console.warn('Set pagination & fetch data', page);
  }

  refreshData(): void {
    this.store.dispatch(new FetchProductCategoryList())
    console.warn('Fetch data');
  }
}
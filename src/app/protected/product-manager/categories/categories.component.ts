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
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionResponse } from 'src/app/common/interfaces';
import { Action } from 'src/app/common/enums';
import { PrductCategoryUIState } from 'src/app/store/product-category';
import { ActionService } from 'src/app/common/services';
import { ViewTogglePaginationComponent } from 'src/app/private/system/common/view-toggle-pagination/view-toggle-pagination.component';
import { 
  SetLoadingStatus, 
  ToggleView 
} from 'src/app/store/base-ui';
import { StateKey } from 'src/app/store/state-key.token';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CATEGORY_MAT_IMPORTS } from './category-imports';
import { CategoriesGridComponent } from './categories-grid/categories-grid.component';


interface PeriodicElement {
  photo: string;
  name: string;
  position: number;
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
    private actionSvc: ActionService
  ) { }

  ngOnInit(): void {
    this.subscribeToActions();
    this.syncState();
    
    this.dataSource$.next(this.dataSource);
  }

  private subscribeToActions(): void {
    this.actionSvc.action$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(action => this.handleAction(action));
  }

  private syncState(): void {
    this.isListView$ = this.store.select(PrductCategoryUIState.isListView);
    this.isLoading$ = this.store.select(PrductCategoryUIState.isLoading);
  }

  private dataSource: PeriodicElement[] = [
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U' ,position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 22, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 25, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 31, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 32, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 33, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 34, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 35, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 36, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 37, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 38, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 39, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 40, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  private handleAction(actionResponse: ActionResponse) {
    switch (actionResponse.action) {
      case Action.CREATE_CATEGORY:
        console.warn(actionResponse);
        break;
      case Action.VIEW_CATEGORY:
        console.warn(actionResponse);
        break;
      case Action.DELETE_CATEGORY:
        console.warn(actionResponse);
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
    this.store.dispatch(new SetLoadingStatus(StateKey.PRODUCT_CATEGORY_UI, true))
    console.warn('Fetch data');
  }
}
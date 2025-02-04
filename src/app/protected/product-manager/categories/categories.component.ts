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
  OnInit 
} from '@angular/core';
import { 
  BehaviorSubject, 
  Observable 
} from 'rxjs';
import { Store } from '@ngxs/store';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionResponse } from 'src/app/common/interfaces';
import { Resource } from 'src/app/common/enums';
import { 
  PrductCategoryUIState, 
  ToggleProductCategoryView 
} from 'src/app/store/product-category';
import { ViewTogglePaginationComponent } from 'src/app/private/system/common/view-toggle-pagination/view-toggle-pagination.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { CATEGORY_MAT_IMPORTS } from './category-imports';
import { DynamicGridComponent } from 'src/app/private/system/common/dynamic-grid/dynamic-grid.component';
import { DynamicGridItemConfig } from 'src/app/private/system/common/dynamic-grid';
import { CategoriesGridConfigHelper } from './categories-grid-config-helper';

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
    ViewTogglePaginationComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly resource = Resource.CATEGORIES;

  isListView$!: Observable<boolean>;
  dataSource$ = new BehaviorSubject<PeriodicElement[]>([]);
  gridItemConfig$ = new BehaviorSubject<DynamicGridItemConfig>(CategoriesGridConfigHelper.create(this.resource));
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.syncState();
    
    this.dataSource$.next(this.dataSource);
  }

  private syncState(): void {
    this.isListView$ = this.store.select(PrductCategoryUIState.isListView);
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
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {photo:'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ' ,position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  clickResponse(actionResponse: ActionResponse): void {
    console.warn(actionResponse);
  }

  viewToggled(): void {
    this.store.dispatch(new ToggleProductCategoryView());
  }
}
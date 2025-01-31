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
import { BehaviorSubject } from 'rxjs';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { DataViewComponent } from 'src/app/private/system/common/data-view/data-view.component';
import { ActionResponse } from 'src/app/common/interfaces';
import { Resource } from 'src/app/common/enums';
import { DynamicTableColumnConfig } from 'src/app/private/system/common/dynamic-table';
import { CategoriesTableConfigHelper } from './categories-table-config-helper';

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
    StandaloneCommonModule,
    MaterialModule,
    DataViewComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly resource = Resource.CATEGORIES;

  tableColumnConfigs$ = new BehaviorSubject<DynamicTableColumnConfig[]>([]);
  dataSource$ = new BehaviorSubject<PeriodicElement[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.tableColumnConfigs$.next(this.tableColumnConfigs);
    this.dataSource$.next(this.dataSource);
  }
  
  private tableColumnConfigs = 
    CategoriesTableConfigHelper.createTableColumns(this.resource);

  private dataSource: PeriodicElement[] = [
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
}
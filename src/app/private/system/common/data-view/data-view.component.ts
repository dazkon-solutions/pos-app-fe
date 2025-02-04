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
  EventEmitter, 
  Input, 
  Output
} from '@angular/core';
import { Observable } from 'rxjs';
import { ActionResponse } from 'src/app/common/interfaces';
import { ViewTogglePaginationComponent } from '../view-toggle-pagination/view-toggle-pagination.component';
import { DynamicGridComponent } from '../dynamic-grid/dynamic-grid.component';
import { DynamicGridItemConfig } from '../dynamic-grid/dynamic-grid.interface';
import { DATA_VIEW_MAT_IMPORTS } from './data-view-imports';

@Component({
  selector: 'daz-data-view',
  imports: [
    DATA_VIEW_MAT_IMPORTS,
    DynamicGridComponent,
    // ViewTogglePaginationComponent
  ],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.scss'
})
export class DataViewComponent {

  @Input('gridItemConfig$')
  gridItemConfig$!: Observable<DynamicGridItemConfig>;
  
  @Input('dataSource$')
  dataSource$!: Observable<any[]>;

  @Input('isLoading$')
  isLoading$!: Observable<boolean>;

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<ActionResponse>(true);

  handleActionResponse(actionResponse: ActionResponse): void {
    this.buttonClicked.emit(actionResponse);
  }
}
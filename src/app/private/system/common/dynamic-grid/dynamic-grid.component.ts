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
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ActionResponse } from 'src/app/common/interfaces';
import { DynamicGridItemConfig } from './dynamic-grid.interface';
import { DynamicGridItemComponent } from './dynamic-grid-item/dynamic-grid-item.component';

@Component({
  selector: 'daz-dynamic-grid',
  imports: [
    CORE_IMPORTS,
    DynamicGridItemComponent
  ],
  templateUrl: './dynamic-grid.component.html',
  styleUrl: './dynamic-grid.component.scss'
})
export class DynamicGridComponent {
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
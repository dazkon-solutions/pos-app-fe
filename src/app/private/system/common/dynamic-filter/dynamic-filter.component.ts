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
import { Store } from '@ngxs/store';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { DYNAMIC_FILTER_MAT_IMPORTS } from './dynamic-filter-imports';


@Component({
  selector: 'daz-dynamic-filter',
  imports: [
    CORE_IMPORTS,
    DYNAMIC_FILTER_MAT_IMPORTS
  ],
  templateUrl: './dynamic-filter.component.html',
  styleUrl: './dynamic-filter.component.scss'
})
export class DynamicFilterComponent implements OnInit {
  filterName = '';
  LocaleKeys = LocaleKeys;
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.syncState();
  }

  private syncState(): void {
    //
  }
  
  onClickSearch(): void {
    //
  }

  onClickReset(): void {
    //
  }
}
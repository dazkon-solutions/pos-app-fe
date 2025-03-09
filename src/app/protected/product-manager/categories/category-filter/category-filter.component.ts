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
import { FILTER_MAT_IMPORTS } from 'src/app/common/imports/filter-imports';


@Component({
  selector: 'daz-category-filter',
  imports: [
    CORE_IMPORTS,
    FILTER_MAT_IMPORTS
  ],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent implements OnInit {
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
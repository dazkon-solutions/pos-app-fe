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
import { Permission } from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { FILTER_MAT_IMPORTS } from 'src/app/common/imports/filter-imports';
import { ButtonStyleClass, ButtonType } from 'src/app/private/system/common/button';
import { ButtonComponent } from 'src/app/private/system/common/button/button.component';
import { ActivateMainSearchFilter, DeactivateMainSearchFilter } from 'src/app/store/main-search';


@Component({
  selector: 'daz-category-filter',
  imports: [
    CORE_IMPORTS,
    FILTER_MAT_IMPORTS,
    ButtonComponent
  ],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent implements OnInit {
  buttonToAddNew = {
    type: ButtonType.STROKED,
    permission: Permission.CAN_CREATE_CATEGORY,
    label: LocaleKeys.labels.buttons.addNew,
    icon: 'add',
    styleClass: ButtonStyleClass.BTN_WARN
  };

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
    this.store.dispatch(new ActivateMainSearchFilter());
  }

  onClickReset(): void {
    this.store.dispatch(new DeactivateMainSearchFilter());
  }
}
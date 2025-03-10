/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { POS_MAT_IMPORTS } from './pos-imports';
import { LocaleKeys } from 'src/app/common/constants';
import { Navigator } from 'src/app/common/services';


@Component({
  selector: 'daz-pos',
  imports: [
    CORE_IMPORTS,
    POS_MAT_IMPORTS
  ],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class PosComponent {
  LocaleKeys = LocaleKeys;

  constructor(
    private navigateSvc: Navigator
  ) { }

  navigateToDashboard(): void {
    this.navigateSvc.navigateToDashboardWithUpdatingMenu();
  }
}
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { Resource } from 'src/app/common/enums';
import { MaterialModule } from 'src/app/common/modules';
import { Navigator } from 'src/app/common/services';

@Component({
  selector: 'daz-dashboard',
  imports: [
    MaterialModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private navigateSvc: Navigator) { }

  onClickTest(): void {
    this.navigateSvc.navigateTo(Resource.PRODUCTS);
  }
}
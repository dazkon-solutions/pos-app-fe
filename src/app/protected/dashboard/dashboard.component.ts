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
  inject, 
  OnInit 
} from '@angular/core';
import { Store } from '@ngxs/store';
import { SetResource } from 'src/app/store/navigation-config';
import { Resource } from 'src/app/common/enums';

@Component({
  selector: 'daz-dashboard',
  imports: [
    //
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);

  private resource = Resource.DASHBOARD;

  ngOnInit(): void {
    this.init();    
  }

  private init(): void {
    this.store.dispatch(new SetResource(this.resource));
  }
}
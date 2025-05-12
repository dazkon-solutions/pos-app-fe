/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { Action, Resource } from 'src/app/common/enums';
import { SetResource } from 'src/app/store/navigation-config';

@Component({
  selector: 'daz-products',
  imports: [
    //
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private store = inject(Store);

  private resource = Resource.PRODUCTS;

  ngOnInit(): void {
    this.init();    
  }

  private init(): void {
    this.store.dispatch(new SetResource(this.resource));
  }
}
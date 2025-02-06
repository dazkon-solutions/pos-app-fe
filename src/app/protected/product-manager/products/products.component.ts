/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action, Resource } from 'src/app/common/enums';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';

@Component({
  selector: 'daz-products',
  imports: [
    ActionButtonComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly resource = Resource.PRODUCTS;

  createButtonConfig$ = new BehaviorSubject<ActionButtonConfig>({
    type: ActionButtonType.CREATE,
    action: Action.NONE
  });
}
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { ButtonEvent } from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { CommonAutoCompleteComponent } from 'src/app/private/system/common/auto-completes/common-auto-complete/common-auto-complete.component';
import { PersonAutoCompleteComponent } from 'src/app/private/system/common/auto-completes/person-auto-complete/person-auto-complete.component';
import { POS_MAT_IMPORTS } from '../pos-imports';

@Component({
  selector: 'daz-pos-customer-and-product',
  imports: [
    CORE_IMPORTS,
    POS_MAT_IMPORTS,
    // PersonAutoCompleteComponent,
    // CommonAutoCompleteComponent
  ],
  templateUrl: './pos-customer-and-product.component.html',
  styleUrl: './pos-customer-and-product.component.scss'
})
export class PosCustomerAndProductComponent {
  isCustomerLoading$!: Observable<boolean>;
  isProductLoading$!: Observable<boolean>;
  form: FormGroup;
  LocaleKeys = LocaleKeys;


  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.createForm(this.formBuilder);
  }

  createForm(formBuilder: FormBuilder): any {
    return formBuilder.group({
      customer: [
        {
          value: '',
          disabled: false
        },
        [Validators.required]
      ],
      product: [
        {
          value: '',
          disabled: false
        },
        [Validators.required]
      ]
    });
  }

  onFilterCustomer(filterTerm: string): void {
    console.warn('customer filter', filterTerm);
  }

  onFilterProduct(filterTerm: string): void {
    console.warn('porduct filter', filterTerm);
  }

  customerFetchClicked(buttonEvent: ButtonEvent): void {
    this.isCustomerLoading$ = of(true);
    console.warn('fetch customer', buttonEvent);
  }

  productFetchClicked(buttonEvent: ButtonEvent): void {
    this.isProductLoading$ = of(true);
    console.warn('fetch product', buttonEvent);
  }

  openCustomerRegister(): void {
    
  }

  getCustomerList(): Observable<any[]> {
    const list = [
      {
        id: 1,
        name: "Samantha rathnayake",
        title: 'MR'
      },
      {
        id: 2,
        name: "Sugath bandara",
        title: 'MR'
      },
      {
        id: 3,
        name: "Nimesha ranathunga",
        title: 'MISS'
      },
      {
        id: 4,
        name: "Sarath dassanayake",
        title: 'MR'
      },
      {
        id: 5,
        name: "Mahesh bandara",
        title: 'MR'
      }
    ];
    return of(list);
  }

  getProductList(): Observable<any[]> {
    const list = [
      {
        id: 1,
        name: 'Sugger',
        qty: 3,
        unitOfMeasure: 'pcs',
        price: 300.00,
        total: 900.00,
        discountAmount: 100,
        discountPercentage: 0,
        subtotal: 800.00
      },
      {
        id: 2,
        name: 'Broom',
        qty: 1,
        unitOfMeasure: 'pcs',
        price: 100.00,
        total: 100.00,
        discountAmount: 0,
        discountPercentage: 10,
        subtotal: 90.00
      },
      {
        id: 3,
        name: 'Soap',
        qty: 5,
        unitOfMeasure: 'pcs',
        price: 50.00,
        total: 250.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 250.00
      },
      {
        id: 4,
        name: 'Shampoo',
        qty: 2,
        unitOfMeasure: 'btl',
        price: 150.00,
        total: 300.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 300.00
      },
      {
        id: 5,
        name: 'Rice',
        qty: 10,
        unitOfMeasure: 'kg',
        price: 40.00,
        total: 400.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 400.00
      },
      {
        id: 6,
        name: 'Oil',
        qty: 3,
        unitOfMeasure: 'ltr',
        price: 120.00,
        total: 360.00,
        discountAmount: 60,
        discountPercentage: 0,
        subtotal: 300.00
      },
      {
        id: 7,
        name: 'Bread',
        qty: 4,
        unitOfMeasure: 'ltr',
        price: 30.00,
        total: 120.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 120.00
      },
      {
        id: 8,
        name: 'Butter',
        qty: 2,
        unitOfMeasure: 'pcs',
        price: 80.00,
        total: 160.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 160.00
      },
      {
        id: 9,
        name: 'Cheese',
        qty: 1,
        unitOfMeasure: 'pcs',
        price: 200.00,
        total: 200.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 200.00
      },
      {
        id: 10,
        name: 'Milk',
        qty: 6,
        unitOfMeasure: 'ltr',
        price: 50.00,
        total: 300.00,
        discountAmount: 0,
        discountPercentage: 5,
        subtotal: 285.00
      },
      {
        id: 11,
        name: 'Eggs',
        qty: 12,
        unitOfMeasure: 'pcs',
        price: 10.00,
        total: 120.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 120.00
      },
      {
        id: 12,
        name: 'Chicken',
        qty: 2,
        unitOfMeasure: 'kg',
        price: 150.00,
        total: 300.00,
        discountAmount: 0,
        discountPercentage: 0,
        subtotal: 300.00
      }
    ];
    return of(list);
  }
}
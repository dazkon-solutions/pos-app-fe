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
  FormGroup 
} from '@angular/forms';
import { 
  Observable, 
  of 
} from 'rxjs';
import { Store } from '@ngxs/store';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ButtonEvent } from 'src/app/common/enums';
import { CommonAutoCompleteComponent } from 'src/app/private/system/common/auto-completes/common-auto-complete/common-auto-complete.component';
import { FORM_MAT_IMPORTS } from 'src/app/common/imports/form-imports';
import { POS_MAT_IMPORTS } from '../pos-imports';

@Component({
  selector: 'daz-pos-product-grid',
  imports: [
    CORE_IMPORTS,
    POS_MAT_IMPORTS,
    FORM_MAT_IMPORTS,
    // CommonAutoCompleteComponent
  ],
  templateUrl: './pos-product-grid.component.html',
  styleUrl: './pos-product-grid.component.scss'
})
export class PosProductGridComponent {
  isCategoryLoading$!: Observable<boolean>;
  isBrandLoading$!: Observable<boolean>;
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
      category: [
        {
          value: '',
          disabled: false
        }
      ],
      brand: [
        {
          value: '',
          disabled: false
        }
      ],
      product: [
        {
          value: '',
          disabled: false
        }
      ]
    });
  }

  onFilterCategory(filterTerm: string): void {
    console.warn('category filter', filterTerm);
  }

  onFilterBrand(filterTerm: string): void {
    console.warn('brand filter', filterTerm);
  }

  categoryFetchClicked(buttonEvent: ButtonEvent): void {
    this.isCategoryLoading$ = of(true);
    console.warn('fetch category', buttonEvent);
  }

  brandFetchClicked(buttonEvent: ButtonEvent): void {
    this.isBrandLoading$ = of(true);
    console.warn('fetch brand', buttonEvent);
  }

  getCategoryList(): Observable<any[]> {
    const list = [
      { id: 1, name: 'Sugger' },
      { id: 2, name: 'Broom' },
      { id: 3, name: 'Soap' },
      { id: 4, name: 'Shampoo' },
      { id: 5, name: 'Rice' },
      { id: 6, name: 'Oil' },
      { id: 7, name: 'Bread' },
      { id: 8, name: 'Butter' },
      { id: 9, name: 'Cheese' },
      { id: 10, name: 'Milk' },
      { id: 11, name: 'Eggs' },
      { id: 12, name: 'Chicken' }
    ];
    return of(list);
  }

  getBrandList(): Observable<any[]> {
    const list = [
      { id: 1, name: 'Brand A' },
      { id: 2, name: 'Brand B' },
      { id: 3, name: 'Brand C' },
      { id: 4, name: 'Brand D' },
      { id: 5, name: 'Brand E' },
      { id: 6, name: 'Brand F' },
      { id: 7, name: 'Brand G' },
      { id: 8, name: 'Brand H' },
      { id: 9, name: 'Brand I' },
      { id: 10, name: 'Brand J' }
    ];
    return of(list);
  }

  productList = [
    {
      id: 1,
      name: 'Sugger',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
      price: 300.00,
      code: 'PRD001'
    },
    {
      id: 2,
      name: 'Broom',
      image: '',
      price: 100.00,
      code: 'PRD002'
    },
    {
      id: 3,
      name: 'Soap',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
      price: 50.00,
      code: 'PRD003'
    },
    {
      id: 4,
      name: 'Shampoo',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
      price: 150.00,
      code: 'PRD004'
    },
    {
      id: 5,
      name: 'Rice',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
      price: 40.00,
      code: 'PRD005'
    },
    {
      id: 6,
      name: 'Oil',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
      price: 120.00,
      code: 'PRD006'
    },
    {
      id: 7,
      name: 'Bread',
      image: '',
      price: 30.00,
      code: 'PRD007'
    },
    {
      id: 8,
      name: 'Butter',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',
      price: 80.00,
      code: 'PRD008'
    },
    {
      id: 9,
      name: 'Cheese',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',
      price: 200.00,
      code: 'PRD009'
    },
    {
      id: 10,
      name: 'Milk',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',
      price: 50.00,
      code: 'PRD010'
    },
    {
      id: 11,
      name: 'Eggs',
      image: '',
      price: 10.00,
      code: 'PRD011'
    },
    {
      id: 12,
      name: 'Chicken',
      image: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',
      price: 150.00,
      code: 'PRD012'
    },
    {
      id: 13,
      name: 'Pasta',
      image: '',
      price: 60.00,
      code: 'PRD013'
    },
    {
      id: 14,
      name: 'Tomato Sauce',
      image: '',
      price: 45.00,
      code: 'PRD014'
    },
    {
      id: 15,
      name: 'Salt',
      image: '',
      price: 20.00,
      code: 'PRD015'
    },
    {
      id: 16,
      name: 'Pepper',
      image: '',
      price: 25.00,
      code: 'PRD016'
    },
    {
      id: 17,
      name: 'Garlic',
      image: '',
      price: 15.00,
      code: 'PRD017'
    },
    {
      id: 18,
      name: 'Onion',
      image: '',
      price: 12.00,
      code: 'PRD018'
    },
    {
      id: 19,
      name: 'Potato',
      image: '',
      price: 30.00,
      code: 'PRD019'
    },
    {
      id: 20,
      name: 'Carrot',
      image: '',
      price: 25.00,
      code: 'PRD020'
    },
    {
      id: 21,
      name: 'Cabbage',
      image: '',
      price: 35.00,
      code: 'PRD021'
    },
    {
      id: 22,
      name: 'Spinach',
      image: '',
      price: 40.00,
      code: 'PRD022'
    }
  ]
}
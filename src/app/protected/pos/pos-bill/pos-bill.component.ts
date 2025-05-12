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
import { POS_MAT_IMPORTS } from '../pos-imports';
import { Observable } from 'rxjs';

@Component({
  selector: 'daz-pos-bill',
  imports: [
    CORE_IMPORTS,
    POS_MAT_IMPORTS
  ],
  templateUrl: './pos-bill.component.html',
  styleUrl: './pos-bill.component.scss'
})
export class PosBillComponent {
  displayedColumns = [
    'id',
    'product',
    'qty',
    'total',
    'discount',
    'subtotal'
  ];

  constructor() { 
  }

  
  productList = [
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
  ]
}
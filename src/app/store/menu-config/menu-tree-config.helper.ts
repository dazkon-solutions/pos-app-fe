/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Resource } from "src/app/common/enums";
import { LocaleKeys } from "src/app/common/constants";
import { MenuNode } from "./menu.interface";

export class MenuTreeConfigHelper {
  static createTree(): MenuNode[] {
    const items: MenuNode[] = [
      {
        uid: 1,
        pid: 0,
        name: LocaleKeys.titles.dashboard,
        description: LocaleKeys.titles.dashboard,
        icon: 'dashboard',
        route: '',
        resource: Resource.DASHBOARD
      },
      {
        uid: 10,
        pid: 0,
        name: LocaleKeys.titles.products,
        description: LocaleKeys.titles.products,
        icon: 'inventory',
        resource: Resource.PRODUCT_MANAGER,
        children: [
          {
            uid: 11,
            pid: 10,
            name: LocaleKeys.titles.products,
            description: LocaleKeys.titles.products,
            route: 'products',
            resource: Resource.PRODUCTS
          }, 
          {
            uid: 12,
            pid: 10,
            name: LocaleKeys.titles.categories,
            description: LocaleKeys.titles.categories,
            route: 'categories',
            resource: Resource.CATEGORIES
          },
          {
            uid: 13,
            pid: 10,
            name: LocaleKeys.titles.brands,
            description: LocaleKeys.titles.brands,
            route: 'brands',
            resource: Resource.BRANDS
          }
        ]
      },
    ];

    return items;
  }
}
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Permission } from "src/app/common/enums";
import { LocaleKeys } from "src/app/common/constants";
import { MenuNode } from "./menu.interface";
import { RoutePaths } from "src/app/common/navigation";

export class MenuTreeConfigHelper {
  static createTree(): MenuNode[] {
    const items: MenuNode[] = [
      {
        uid: 1,
        pid: 0,
        name: LocaleKeys.titles.mainMenu.dashboard,
        description: LocaleKeys.titles.mainMenu.dashboard,
        icon: 'dashboard',
        routePath: RoutePaths.DASHBOARD,
        permission: Permission.VIEW_DASHBOARD
      },
      {
        uid: 10,
        pid: 0,
        name: LocaleKeys.titles.mainMenu.products,
        description: LocaleKeys.titles.mainMenu.products,
        icon: 'product',
        permission: Permission.VIEW_PRODUCTS_SECTION,
        children: [
          {
            uid: 11,
            pid: 10,
            name: LocaleKeys.titles.mainMenu.allProducts,
            description: LocaleKeys.titles.mainMenu.allProducts,
            routePath: RoutePaths.PRODUCT_LIST_PAGE,
            permission: Permission.VIEW_PRODUCT_LIST_PAGE
          }, 
          {
            uid: 12,
            pid: 10,
            name: LocaleKeys.titles.mainMenu.categories,
            description: LocaleKeys.titles.mainMenu.categories,
            routePath: RoutePaths.CATEGORY_LIST_PAGE,
            permission: Permission.VIEW_CATEGORY_LIST_PAGE
          },
          {
            uid: 13,
            pid: 10,
            name: LocaleKeys.titles.mainMenu.brands,
            description: LocaleKeys.titles.mainMenu.brands,
            routePath: RoutePaths.BRAND_LIST_PAGE,
            permission: Permission.VIEW_BRAND_LIST_PAGE
          },
          {
            uid: 14,
            pid: 10,
            name: LocaleKeys.titles.mainMenu.samples,
            description: LocaleKeys.titles.mainMenu.samples,
            routePath: RoutePaths.SAMPLE_LIST_PAGE,
            permission: Permission.VIEW_SAMPLE_LIST_PAGE
          },
        ]
      },
    ];

    return items;
  }
}
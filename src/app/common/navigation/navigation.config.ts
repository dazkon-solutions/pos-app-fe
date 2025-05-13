/**
 * Copyright (c) 2025 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Permission } from "../enums";
import { RoutePaths } from "./route-paths";

interface NavigationConfig {
  permission: Permission;
  path:       string;
}

export const NAVIGATION_CONFIG: NavigationConfig[] = [ 
  {
    permission: Permission.VIEW_DASHBOARD,
    path: RoutePaths.DASHBOARD
  },
  {
    permission: Permission.VIEW_PRODUCT_LIST_PAGE,
    path: RoutePaths.PRODUCT_LIST_PAGE
  },
  {
    permission: Permission.VIEW_SAMPLE_LIST_PAGE,
    path: RoutePaths.SAMPLE_LIST_PAGE
  },
  {
    permission: Permission.VIEW_BRAND_LIST_PAGE,
    path: RoutePaths.BRAND_LIST_PAGE
  },
];
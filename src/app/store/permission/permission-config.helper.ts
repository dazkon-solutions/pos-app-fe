/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Action } from "src/app/common/enums";
import { PermissionStateModel } from "./permission-state.model";


export class PermissionConfigHelper {
  private static actionList = Object.values(Action); // TODO: Remove

  static createDefault(): PermissionStateModel {
    return {
      list: this.list
    };
  }

  private static list: any[] = [
    'CREATE_PRODUCT',
    'VIEW_PRODUCT',
    'UPDATE_PRODUCT',
    'DELETE_PRODUCT',
    // 'CREATE_CATEGORY',
    'VIEW_CATEGORY',
    'UPDATE_CATEGORY',
    'DELETE_CATEGORY',
    'CREATE_BRAND',
    'VIEW_BRAND',
    'UPDATE_BRAND',
    'DELETE_BRAND'
  ]
}
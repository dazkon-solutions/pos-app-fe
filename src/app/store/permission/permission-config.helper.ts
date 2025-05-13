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
    'VIEW_BRAND_LIST_PAGE',
    'VIEW_BRAND',
    'CAN_CREATE_BRAND',
    'CAN_UPDATE_BRAND',
    'CAN_DELETE_BRAND',
    'VIEW_SAMPLE_LIST_PAGE',
    'VIEW_SAMPLE',
    'CAN_CREATE_SAMPLE',
    'CAN_UPDATE_SAMPLE',
    'CAN_DELETE_SAMPLE',
  ]
}
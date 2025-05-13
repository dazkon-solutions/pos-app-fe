/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Permission, 
  Resource 
} from "src/app/common/enums";

export class ControlBarConfigHelper {
  private static resourcePermissionForAddNewBtn: { [key in Resource]?: Permission } = {
    [Resource.PRODUCTS]: Permission.CAN_CREATE_PRODUCT,
    [Resource.SAMPLES]: Permission.CAN_CREATE_SAMPLE,
    [Resource.BRANDS]: Permission.CAN_CREATE_BRAND,
  };

  static getResourcePermissionForAddNewBtn(
    resource: Resource
  ): Permission | null {
    return this.resourcePermissionForAddNewBtn[resource] ?? null;
  }
}
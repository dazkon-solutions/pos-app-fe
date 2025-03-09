/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Action, Resource } from "src/app/common/enums";


export class ControlBarConfigHelper {
  private static resourceCreateActionMap: { [key in Resource]?: Action } = {
    [Resource.PRODUCTS]: Action.CREATE_PRODUCT,
    [Resource.CATEGORIES]: Action.CREATE_CATEGORY,
    [Resource.BRANDS]: Action.CREATE_BRAND,
  };

  static getCreateActionForResource(resource: Resource): Action {
    return this.resourceCreateActionMap[resource] ?? Action.DEFAULT;
  }
}
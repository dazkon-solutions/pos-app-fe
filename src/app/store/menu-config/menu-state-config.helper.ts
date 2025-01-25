/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { MenuStateModel } from "./menu-state.interface";

export class MenuStateConfigHelper {
  static createDefault(): MenuStateModel {
    return {
      parent: 1,
      child: 0,
      current: null,
      tree: [],
      isLoaded: false
    };
  }
}
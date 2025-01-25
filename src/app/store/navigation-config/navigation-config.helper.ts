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
import { NavigationStateModel } from "./navigation-state.interface";


export class NavigationConfigHelper {
  static createDefault(): NavigationStateModel {
    return {
      uid: 1,
      pid: 0,
      name: '',
      description: LocaleKeys.titles.dashboard,
      route: '',
      resource: Resource.DASHBOARD
    };
  }
}
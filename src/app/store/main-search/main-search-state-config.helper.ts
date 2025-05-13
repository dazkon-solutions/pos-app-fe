/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Resource } from "src/app/common/enums";
import { MainSearchStateModel } from "./main-search-state.model";
import { MainSearchConfig } from "./main-search.interface";


export class MainSearchStateConfigHelper {
  static createDefault(): MainSearchStateModel {
    return {
      searchTerm: '',
      isFilterActivated: false,
      config: null
    };
  }

  static createConfigList(): MainSearchConfig[] {
    return [
      {
        resource: Resource.PRODUCTS,
        hasFilter: false
      },
      {
        resource: Resource.CATEGORIES,
        hasFilter: true
      },
      {
        resource: Resource.BRANDS,
        hasFilter: false
      }
    ];
  }

  static getConfigByResource(resource: Resource): MainSearchConfig | null {
    return this.createConfigList().find(config => 
      config.resource === resource) ?? null;
  }
}
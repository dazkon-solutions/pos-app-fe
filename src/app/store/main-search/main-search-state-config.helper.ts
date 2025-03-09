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
import { MainSearchStateModel } from "./main-search-state.model";
import { MainSearchConfig } from "./main-search.interface";


export class MainSearchStateConfigHelper {
  static createDefault(): MainSearchStateModel {
    return {
      searchTerm: '',
      config: this.defaultConfig(),
      isFilterActivated: false
    };
  }

  static defaultConfig(): MainSearchConfig {
    return {
      label: LocaleKeys.labels.forms.search,
      resource: Resource.NONE,
      hasFilter: false
    }
  }

  static createConfigList(): MainSearchConfig[] {
    return [
      // {
      //   label: LocaleKeys.labels.forms.searchByName,
      //   resource: Resource.PRODUCTS
      // },
      {
        label: LocaleKeys.labels.forms.searchByName,
        resource: Resource.CATEGORIES,
        hasFilter: true
      },
      {
        label: LocaleKeys.labels.forms.searchByName,
        resource: Resource.BRANDS,
        hasFilter: true
      },
    ];
  }

  static getConfigByResource(resource: Resource): MainSearchConfig {
    const configList = this.createConfigList();
    return configList.find(config => config.resource === resource) 
      ?? this.defaultConfig();
  }
}
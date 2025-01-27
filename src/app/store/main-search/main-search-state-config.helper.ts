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
import { 
  MainSearchConfig, 
  MainSearchStateModel 
} from "./main-search-state.interface";


export class MainSearchStateConfigHelper {
  static createDefault(): MainSearchStateModel {
    return {
      searchTerm: '',
      config: this.defaultConfig(),
      list: this.createConfigList(),
      isFilterActive: false
    };
  }

  static defaultConfig(): MainSearchConfig {
    return {
      label: LocaleKeys.labels.forms.filtersAreNotAvailableHere,
      resource: Resource.NONE,
      isFilterAvailable: false
    }
  }

  static createConfigList(): MainSearchConfig[] {
    return [
      // {
      //   label: LocaleKeys.labels.forms.productsFilter,
      //   resource: Resource.PRODUCTS,
      //   isFilterAvailable: false
      // },
      // {
      //   label: LocaleKeys.labels.forms.searchTeachers,
      //   resource: Resource.TEACHERS,
      //   isFilterAvailable: true
      // },
      {
        label: LocaleKeys.labels.forms.productsFilter,
        resource: Resource.PRODUCTS,
        isFilterAvailable: true
      },
    ];
  }
}
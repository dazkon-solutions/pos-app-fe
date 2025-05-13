/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { PaginateConfigHelper } from "src/app/common/helpers";
import { SampleStateModel } from "./sample-state.model";


export class SampleStateConfigHelper {
  static createDefaultFilter(): any {
    return { 
      name: ''
    };
  }
  
  static createDefault(): SampleStateModel {
    return {
      list: [],
      current: null,
      isLoaded: false,
      isFiltered: false,
      filterTerms: this.createDefaultFilter(),
      paginate: PaginateConfigHelper.createDefault()
    };
  }
}
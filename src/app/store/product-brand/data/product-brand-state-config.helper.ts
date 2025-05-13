/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { ProductBrandFilterTerms } from "src/app/common/interfaces";
import { PaginateConfigHelper } from "src/app/common/helpers";
import { ProductBrandStateModel } from "./product-brand-state.model";


export class ProductBrandStateConfigHelper {
  static createDefaultFilter(): ProductBrandFilterTerms {
    return { 
      name: ''
    };
  }
  
  static createDefault(): ProductBrandStateModel {
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
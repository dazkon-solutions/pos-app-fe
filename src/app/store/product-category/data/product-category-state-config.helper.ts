/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { ProductCategoryFilterTerms } from "src/app/common/interfaces";
import { PaginateConfigHelper } from "src/app/common/helpers";
import { ProductCategoryStateModel } from "./product-category-state.model";


export class ProductCategoryStateConfigHelper {
  static createDefaultFilter(): ProductCategoryFilterTerms {
    return { 
      name: ''
    };
  }
  
  static createDefault(): ProductCategoryStateModel {
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
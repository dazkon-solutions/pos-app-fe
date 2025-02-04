/**
 * Copyright (c) 2024 Pragith Lakshan Thilakarathna
 * All rights reserved. 
 * This code is proprietary to CJNextGenSys. 
 * Unauthorized use, reproduction, modification, distribution, or sale 
 * without the explicit written permission of CJNextGenSys is strictly prohibited.
 * For inquiries, please contact: info@cjnextgensys.com
 */

import { ProductCategoryUIStateModel } from "./product-category-ui-state.interface";


export class ProductCategoryUIStateConfigHelper {
  static createDefault(): ProductCategoryUIStateModel {
    return {
      isListView: false
    };
  }
}
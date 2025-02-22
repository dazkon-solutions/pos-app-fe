/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { 
  Selector, 
  State
} from "@ngxs/store";
import { BaseUIState } from "src/app/store/base-ui/base-ui.state";
import { ProductCategoryUIStateConfigHelper } from "./product-category-ui-state-config.helper";
import { ProductCategoryUIStateModel } from "./product-category-ui-state.model";
import { StateKey } from "../../state-key.token";


@State<ProductCategoryUIStateModel>({
  name: StateKey.PRODUCT_CATEGORY_UI,
  defaults: ProductCategoryUIStateConfigHelper.createDefault()
})
@Injectable()
export class PrductCategoryUIState extends BaseUIState<ProductCategoryUIStateModel> {
  constructor() {
    super(StateKey.PRODUCT_CATEGORY_UI);
  } 

  @Selector()
  static isLoading(state: ProductCategoryUIStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static isListView(state: ProductCategoryUIStateModel): boolean {
    return state.isListView;
  }
}
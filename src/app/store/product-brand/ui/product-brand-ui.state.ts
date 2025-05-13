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
import { StateKey } from "../../state-key.token";
import { ProductBrandUIStateModel } from "./product-brand-ui-state.model";
import { ProductBrandUIStateConfigHelper } from "./product-brand-ui-state-config.helper";


@State<ProductBrandUIStateModel>({
  name: StateKey.PRODUCT_BRAND_UI,
  defaults: ProductBrandUIStateConfigHelper.createDefault()
})
@Injectable()
export class ProductBrandUIState extends BaseUIState<ProductBrandUIStateModel> {
  constructor() {
    super(StateKey.PRODUCT_BRAND_UI);
  } 

  @Selector()
  static isLoading(state: ProductBrandUIStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static isListView(state: ProductBrandUIStateModel): boolean {
    return state.isListView;
  }

  @Selector()
  static isProcessing(state: ProductBrandUIStateModel): boolean {
    return state.isProcessing;
  }
}
/**
 * Copyright (c) 2024 Pragith Lakshan Thilakarathna
 * All rights reserved. 
 * This code is proprietary to CJNextGenSys. 
 * Unauthorized use, reproduction, modification, distribution, or sale 
 * without the explicit written permission of CJNextGenSys is strictly prohibited.
 * For inquiries, please contact: info@cjnextgensys.com
 */

import { Injectable } from "@angular/core";
import { 
  Action, 
  Selector, 
  State, 
  StateContext
} from "@ngxs/store";
import { ProductCategoryUIStateConfigHelper } from "./product-category-ui-state-config.helper";
import { ProductCategoryUIStateModel } from "./product-category-ui-state.interface";
import { StateKey } from "../../state-key.token";


export class ToggleProductCategoryView {
  static readonly type = '[Product Category UI] Toggle view';
}

@State<ProductCategoryUIStateModel>({
  name: StateKey.PRODUCT_CATEGORY_UI,
  defaults: ProductCategoryUIStateConfigHelper.createDefault()
})
@Injectable()
export class PrductCategoryUIState {
  @Selector()
  static getValues(
    state: ProductCategoryUIStateModel
  ): ProductCategoryUIStateModel {
    return state;
  }

  @Selector()
  static isListView(state: ProductCategoryUIStateModel): boolean {
    return state.isListView;
  }

  @Action(ToggleProductCategoryView)
  toggleProductCategoryView(
    ctx: StateContext<ProductCategoryUIStateModel>
  ): void {
    const state = ctx.getState();

    ctx.patchState({ 
      isListView: !state.isListView
    });
  }
}
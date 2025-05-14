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
import { ExpenseTypeUIStateModel } from "./expense-type-ui-state.model";
import { ExpenseTypeUIStateConfigHelper } from "./expense-type-ui-state-config.helper";


@State<ExpenseTypeUIStateModel>({
  name: StateKey.EXPENSE_TYPE_UI,
  defaults: ExpenseTypeUIStateConfigHelper.createDefault()
})
@Injectable()
export class ExpenseTypeUIState extends BaseUIState<ExpenseTypeUIStateModel> {
  constructor() {
    super(StateKey.EXPENSE_TYPE_UI);
  } 

  @Selector()
  static isLoading(state: ExpenseTypeUIStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static isListView(state: ExpenseTypeUIStateModel): boolean {
    return state.isListView;
  }

  @Selector()
  static isProcessing(state: ExpenseTypeUIStateModel): boolean {
    return state.isProcessing;
  }
}
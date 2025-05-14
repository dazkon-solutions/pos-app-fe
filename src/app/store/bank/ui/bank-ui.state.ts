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
import { BankUIStateModel } from "./bank-ui-state.model";
import { BankUIStateConfigHelper } from "./bank-ui-state-config.helper";


@State<BankUIStateModel>({
  name: StateKey.BANK_UI,
  defaults: BankUIStateConfigHelper.createDefault()
})
@Injectable()
export class BankUIState extends BaseUIState<BankUIStateModel> {
  constructor() {
    super(StateKey.BANK_UI);
  } 

  @Selector()
  static isLoading(state: BankUIStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static isListView(state: BankUIStateModel): boolean {
    return state.isListView;
  }

  @Selector()
  static isProcessing(state: BankUIStateModel): boolean {
    return state.isProcessing;
  }
}
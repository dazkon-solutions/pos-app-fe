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
import { SampleUIStateConfigHelper } from "./sample-ui-state-config.helper";
import { SampleUIStateModel } from "./sample-ui-state.model";
import { StateKey } from "../../state-key.token";


@State<SampleUIStateModel>({
  name: StateKey.SAMPLE_UI,
  defaults: SampleUIStateConfigHelper.createDefault()
})
@Injectable()
export class SampleUIState extends BaseUIState<SampleUIStateModel> {
  constructor() {
    super(StateKey.SAMPLE_UI);
  } 

  @Selector()
  static isLoading(state: SampleUIStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static isListView(state: SampleUIStateModel): boolean {
    return state.isListView;
  }

  @Selector()
  static isProcessing(state: SampleUIStateModel): boolean {
    return state.isProcessing;
  }
}
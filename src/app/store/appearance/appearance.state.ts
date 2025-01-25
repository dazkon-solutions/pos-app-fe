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
  Action, 
  Selector, 
  State, 
  StateContext 
} from "@ngxs/store";
import { AppearanceStateModel } from "./appearance-state.interface";
import { AppearanceStateConfigHelper } from "./appearance-state-config.helper";
import { StateKey } from "../state-key.token";


export class ToggleTheme {
  static readonly type = '[Appearance] Toggle theme';
}

@State<AppearanceStateModel>({
  name: StateKey.APPEARANCE,
  defaults: AppearanceStateConfigHelper.createDefault()
})
@Injectable()
export class AppearanceState {
  @Selector()
  static getValues(state: AppearanceStateModel): AppearanceStateModel {
    return state;
  }

  @Selector()
  static isLightTheme(state: AppearanceStateModel): boolean {
    return state.isLightTheme;
  }

  @Action(ToggleTheme)
  async toggleTheme(ctx: StateContext<AppearanceStateModel>): Promise<void> {
    const state = ctx.getState();
    ctx.patchState({
      isLightTheme: !state.isLightTheme
    });
  }
}
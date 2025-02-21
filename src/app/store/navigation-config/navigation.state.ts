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
import { NavigationStateModel } from "./navigation-state.model";
import { NavigationConfigHelper } from "./navigation-config.helper";
import { StateKey } from "../state-key.token";


export class SetNavigation {
  static readonly type = '[Navigation] Set navigation';
  constructor(public payload: NavigationStateModel) { }
}

export class ResetNavigation {
  static readonly type = '[Navigation] Reset';
}


@State<NavigationStateModel>({
  name: StateKey.NAVIGATION,
  defaults: NavigationConfigHelper.createDefault()
})
@Injectable()
export class NavigationState {
  @Selector()
  static navigation(state: NavigationStateModel): NavigationStateModel {
    return state;
  }

  @Action(SetNavigation)
  setNavigation(
    ctx: StateContext<NavigationStateModel>,
    action: SetNavigation
  ) {
    ctx.patchState(action.payload);
  }

  @Action(ResetNavigation)
  resetNavigation(ctx: StateContext<ResetNavigation>) {
    ctx.setState(NavigationConfigHelper.createDefault());
  }
}
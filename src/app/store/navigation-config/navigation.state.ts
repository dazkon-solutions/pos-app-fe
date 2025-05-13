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
import { Resource } from "src/app/common/enums";
import { NavigationStateModel } from "./navigation-state.model";
import { NavigationConfigHelper } from "./navigation-config.helper";
import { StateKey } from "../state-key.token";
import { SetMainSearchConfigByResource } from "../main-search";


export class SetNavigationRoutePath {
  static readonly type = '[Navigation] Set route path';
  constructor(public routePath: string) { }
}

export class SetResource {
  static readonly type = '[Navigation] Set resource';
  constructor(public resource: Resource) { }
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
  static getCurrentRoutePath(state: NavigationStateModel): string {
    return state.routePath;
  }

  @Selector()
  static getCurrentResource(state: NavigationStateModel): Resource | null {
    return state.resource;
  }

  @Action(SetNavigationRoutePath)
  setNavigationRoutePath(
    ctx: StateContext<NavigationStateModel>,
    action: SetNavigationRoutePath
  ): void {
    const currentState = ctx.getState();
    if (currentState.routePath === action.routePath) return;

    ctx.patchState({
      routePath: action.routePath,
      resource: null
    });
  }

  @Action(SetResource)
  setResource(
    ctx: StateContext<NavigationStateModel>,
    action: SetResource
  ): void {
    ctx.patchState({
      resource: action.resource
    });

    ctx.dispatch(new SetMainSearchConfigByResource(action.resource));
  }

  @Action(ResetNavigation)
  resetNavigation(ctx: StateContext<ResetNavigation>) {
    ctx.setState(NavigationConfigHelper.createDefault());
  }
}
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
import { MainSearchStateConfigHelper } from "./main-search-state-config.helper";
import { MainSearchStateModel } from "./main-search-state.model";
import { StateKey } from "../state-key.token";
import { MainSearchConfig } from "./main-search.interface";


export class SetMainSearchConfigByResource {
  static readonly type = '[Main search] Set config by resource';
  constructor(public resource: Resource) { }
}

export class SetMainSearchTerm {
  static readonly type = '[Main search] Set search term';
  constructor(public searchTerm: string) { }
}

export class ActivateMainSearchFilter {
  static readonly type = '[Main search] Activate filter';
}

export class DeactivateMainSearchFilter {
  static readonly type = '[Main search] Deactivate filter';
}

export class ResetMainSearchTerm {
  static readonly type = '[Main search] Reset search term';
}

export class ResetMainSearchState {
  static readonly type = '[Main search] Reset';
}

@State<MainSearchStateModel>({
  name: StateKey.MAIN_SEARCH,
  defaults: MainSearchStateConfigHelper.createDefault()
})
@Injectable()
export class MainSearchState {
  @Selector()
  static getValue(state: MainSearchStateModel): string {
    return state.searchTerm;
  }

  @Selector()
  static isFilterActivated(state: MainSearchStateModel): boolean {
    return state.isFilterActivated;
  }

  @Selector()
  static getConfig(state: MainSearchStateModel): MainSearchConfig | null {
    return state.config;
  }

  @Action(SetMainSearchConfigByResource)
  setMainSearchConfigByResource(
    ctx: StateContext<MainSearchStateModel>,
    action: SetMainSearchConfigByResource
  ): void {
    ctx.patchState({
      config: MainSearchStateConfigHelper.getConfigByResource(action.resource)
    });
  }

  @Action(SetMainSearchTerm)
  setMainSearchTerm(
    ctx: StateContext<MainSearchStateModel>,
    action: SetMainSearchTerm
  ): void {
    ctx.patchState({
      searchTerm: action.searchTerm
    });
  }

  @Action(ActivateMainSearchFilter)
  activateMainSearchFilter(ctx: StateContext<MainSearchStateModel>): void {
    ctx.patchState({
      isFilterActivated: true,
    });
  }

  @Action(DeactivateMainSearchFilter)
  deactivateMainSearchFilter(ctx: StateContext<MainSearchStateModel>): void {
    ctx.patchState({
      isFilterActivated: false
    });
  }

  @Action(ResetMainSearchTerm)
  resetMainSearchTerm(ctx: StateContext<MainSearchStateModel>): void {
    ctx.patchState({
      searchTerm: ''
    });
  }

  @Action(ResetMainSearchState)
  resetMainSearchState(ctx: StateContext<MainSearchStateModel>): void {
    ctx.setState(MainSearchStateConfigHelper.createDefault());
  }
}
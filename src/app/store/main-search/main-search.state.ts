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
import { LocaleKeys } from "src/app/common/constants";
import { MainSearchStateConfigHelper } from "./main-search-state-config.helper";
import { MainSearchStateModel } from "./main-search-state.model";
import { MainSearchConfig } from "./main-search.interface";
import { StateKey } from "../state-key.token";


export class SetMainSearchByResource {
  static readonly type = '[Main search] Set by resource';
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
  static getValues(state: MainSearchStateModel): MainSearchStateModel {
    return state;
  }

  @Selector()
  static getConfig(state: MainSearchStateModel): MainSearchConfig {
    return state.config;
  }

  @Selector()
  static getValue(state: MainSearchStateModel): string {
    return state.searchTerm;
  }

  @Selector()
  static isFiltered(state: MainSearchStateModel): boolean {
    return state.isFilterActive;
  }

  @Action(SetMainSearchByResource)
  setMainSearchByResource(
    ctx: StateContext<MainSearchStateModel>,
    action: SetMainSearchByResource
  ): void {
    const state = ctx.getState();
    const selectedConfig = state.list.find(config => 
      config.resource === action.resource);

    ctx.patchState({
      config: selectedConfig ?? MainSearchStateConfigHelper.defaultConfig()
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
    const state = ctx.getState();

    if(!state.config) return;

    ctx.patchState({
      isFilterActive: true,
      config: {
        ...state.config,
        label: LocaleKeys.labels.forms.usingAdvancedFilter
      }
    });
  }

  @Action(DeactivateMainSearchFilter)
  deactivateMainSearchFilter(ctx: StateContext<MainSearchStateModel>): void {
    const state = ctx.getState();
    
    ctx.patchState({
      isFilterActive: false
    });

    // Set value to config.label
    if(!state.config) return;

    ctx.dispatch(new SetMainSearchByResource(state.config?.resource));
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
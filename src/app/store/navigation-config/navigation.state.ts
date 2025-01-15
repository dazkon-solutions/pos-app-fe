/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { 
  Action, 
  Selector, 
  State, 
  StateContext 
} from "@ngxs/store";
import { Resource } from "src/app/common/enums";
import { NavigationConfig } from "src/app/common/interfaces";
import { NavigationStateModel } from "./navigation-state.interface";
import { NavigationConfigHelper } from "./navigation-config.helper";


export class SetNavigationConfigList {
  static readonly type = '[Navigation] Set config list';
}

export class LoadNavigationConfigList {
  static readonly type = '[Navigation] Load config list';
}

export class NavigateToResource {
  static readonly type = '[Navigation] Navigate to resource';
  constructor(public resource: Resource) { }
}

export class ResetNavigation {
  static readonly type = '[Navigation] Reset';
}


@State<NavigationStateModel>({
  name: 'navigation',
  defaults: NavigationConfigHelper.createDefault()
})
@Injectable()
export class NavigationState {
  constructor(private router: Router) { }

  @Selector()
  static getValues(state: NavigationStateModel): NavigationStateModel {
    return state;
  }

  @Selector()
  static getResource(state: NavigationStateModel): Resource {
    return state.resource;
  }

  @Selector()
  static getCurrentParent(state: NavigationStateModel): NavigationConfig {
    return state.current.parent;
  }

  @Selector()
  static getCurrentChild(state: NavigationStateModel): NavigationConfig | null {
    return state.current.child;
  }

  @Selector()
  static getList(state: NavigationStateModel): NavigationConfig[] {
    return state.list;
  }

  @Selector()
  static hasCurrentChild(state: NavigationStateModel): boolean {
    return state.current.child !== null;
  }

  @Action(SetNavigationConfigList)
  setNavigationConfigList(ctx: StateContext<NavigationStateModel>): void {
    const configList = NavigationConfigHelper.createList();
    ctx.patchState({
      list: configList,
      isLoaded: true
    });
  }

  @Action(LoadNavigationConfigList)
  loadNavigationConfigList(ctx: StateContext<NavigationStateModel>): void {
    const state = ctx.getState();

    if(state.isLoaded) return;

    ctx.dispatch(new SetNavigationConfigList());
  }

  flattenNavigation(configs: NavigationConfig[]): NavigationConfig[] {
    return configs.flatMap(item => item.child 
      ? [item, ...this.flattenNavigation(item.child)] 
      : item);
  }

  @Action(NavigateToResource)
  async navigateToResource(
    ctx: StateContext<NavigationStateModel>,
    action: NavigateToResource
  ): Promise<void> {
    await firstValueFrom(ctx.dispatch(new LoadNavigationConfigList()));
    const state = ctx.getState();
    
    const flattendNavigations = this.flattenNavigation(state.list);

    const navigation = flattendNavigations.find(config => 
      config.resource === action.resource);

    if(!navigation) return;

    this.router.navigate([navigation.route]);

    const current = navigation.pid > 0
      ? { parent: state.current.parent, child: navigation }
      : { parent: navigation, child: null };

    ctx.patchState({
      resource: action.resource,
      current
    });
  }

  @Action(ResetNavigation)
  resetNavigation(ctx: StateContext<NavigationStateModel>): void {
    ctx.setState(NavigationConfigHelper.createDefault());
  }
}
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
import { 
  Action as PermissionAction, 
  Resource 
} from "src/app/common/enums";
import { ResourceAction } from "src/app/common/interfaces";
import { ResourceStateConfigHelper } from "./resource-state-config.helper";
import { ResourceStateModel } from "./resource-state.model";
import { StateKey } from "../state-key.token";

export class SetResources {
  static readonly type = '[Resource] Set list';
  constructor(public resourceList: ResourceAction[]) { }
}

export class ResetResources {
  static readonly type = '[Resource] Reset list';
}

export class SetCurrentResource {
  static readonly type = '[Resource] Set current';
  constructor(public resource: Resource) { }
}

export class ResetCurrentResource {
  static readonly type = '[Resource] Reset current';
}

@State<ResourceStateModel>({
  name: StateKey.RESOURCE,
  defaults: ResourceStateConfigHelper.createDefault()
})
@Injectable()
export class ResourceState {
  @Selector()
  static currentResource(state: ResourceStateModel): Resource {
    return state.current;
  }

  @Selector()
  static hasPermission(state: ResourceStateModel) {
    return (resource: Resource, action: PermissionAction) => {
      const permission = state.list.find(item => item.resource === resource);
      if(permission) {
        return permission.actions.includes(action);
      }

      return false;
    };
  }

  @Action(SetResources)
  setResources(
    ctx: StateContext<ResourceStateModel>,
    action: SetResources
  ): void {
    const state = ctx.getState();
    ctx.setState({
      current: state.current,
      list: action.resourceList,
      isLoaded: true
    });
  }

  @Action(SetCurrentResource)
  setCurrentResource(
    ctx: StateContext<ResourceStateModel>,
    action: SetCurrentResource
  ): void {
    ctx.patchState({
      current: action.resource
    });
  }

  @Action(ResetCurrentResource)
  resetCurrentResource(ctx: StateContext<ResourceStateModel>): void {
    ctx.patchState({
      current: Resource.DASHBOARD
    });
  }

  @Action(ResetResources)
  resetResources(ctx: StateContext<ResourceStateModel>): void {
    ctx.setState(ResourceStateConfigHelper.createDefault());
  }
}
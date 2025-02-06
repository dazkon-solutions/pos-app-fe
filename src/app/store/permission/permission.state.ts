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
import { Action as clickAction } from "src/app/common/enums";
import { PermissionStateModel } from "./permission-state.interface";
import { PermissionConfigHelper } from "./permission-config.helper";
import { StateKey } from "../state-key.token";


export class SetPermissionList {
  static readonly type = '[Permission] Set list';
  constructor(public payload: any) { }
}

export class ResetPermissionState {
  static readonly type = '[Permission] Reset';
}

@State<PermissionStateModel>({
  name: StateKey.PERMISSION,
  defaults: PermissionConfigHelper.createDefault()
})
@Injectable()
export class PermissionState {
  @Selector()
  static values(state: PermissionStateModel): PermissionStateModel {
    return state;
  }

  @Selector()
  static getList(state: PermissionStateModel): clickAction[] {
    return state.list;
  }

  @Action(SetPermissionList)
  setPermissionList(
    ctx: StateContext<PermissionStateModel>,
    action: SetPermissionList
  ) {
    ctx.patchState({
      // TODO: Implement
    });
  }

  @Action(ResetPermissionState)
  resetPermissionState(ctx: StateContext<PermissionStateModel>) {
    ctx.setState(PermissionConfigHelper.createDefault());
  }
}
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
import { DeletableResponse } from "src/app/common/interfaces";
import { DeletableStateConfigHelper } from "./deletable-state-config.helper";
import { DeletableStateModel } from "./deletable-state.model";
import { StateKey } from "../state-key.token";


export class SetDeletableResponse {
  static readonly type = '[Deletable] Set response';
  constructor(public payload: DeletableResponse) { }
}

export class ResetDeletableState {
  static readonly type = '[Deletable] Reset state';
}

@State<DeletableStateModel>({
  name: StateKey.DELETABLE,
  defaults: DeletableStateConfigHelper.createDefault()
})
@Injectable()
export class DeletableState {
  @Selector()
  static getResponse(state: DeletableStateModel): DeletableResponse {
    return state;
  }

  @Action(SetDeletableResponse)
  setDeletableResponse(
    ctx: StateContext<DeletableStateModel>,
    action: SetDeletableResponse
  ): void {
    ctx.setState(action.payload);
  }

  @Action(ResetDeletableState)
  resetDeletableState(ctx: StateContext<DeletableStateModel>): void {
    ctx.setState(DeletableStateConfigHelper.createDefault());
  }
}
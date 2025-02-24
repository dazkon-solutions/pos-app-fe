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
import { EndpointStateConfigHelper } from "./endpoint-state-config.helper";
import { StateKey } from "../state-key.token";
import { EndpointConfigStateModel } from "./endpoint-config-state.model";

export class SetEndpoints {
  static readonly type = '[EndPoints] Set';
  constructor(public payload: any) { }
}

export class ResetEndpoints {
  static readonly type = '[EndPoints] Reset';
}

@State<any>({
  name: StateKey.ENDPOINT,
  defaults: EndpointStateConfigHelper.createDefault()
})
@Injectable()
export class EndpointConfigState {
  @Selector()
  static getValues(state: EndpointConfigStateModel): any {
    return state;
  }

  @Selector()
  static getEndpoints(state: EndpointConfigStateModel): any {
    return state.endpoints;
  }

  @Selector()
  static isLoaded(state: EndpointConfigStateModel): boolean {
    return state.isLoaded;
  }

  @Action(SetEndpoints)
  setChild(
    ctx: StateContext<any>,
    action: SetEndpoints
  ) {
    const state = ctx.getState();
    ctx.setState({
      isLoaded: true,
      ...action.payload
    });
  }

  @Action(ResetEndpoints)
  resetEndpoints(ctx: StateContext<ResetEndpoints>) {
    ctx.setState(EndpointStateConfigHelper.createDefault());
  }
}
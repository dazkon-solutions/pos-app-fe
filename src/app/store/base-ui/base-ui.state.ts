/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Action, 
  StateContext
} from "@ngxs/store";
import { StateKey } from "../state-key.token";
import { BaseUIStateModel } from "./base-ui-state.model";

export class SetLoadingStatus {
  static readonly type = '[UI] Set loading status';
  constructor(
    public StateKey: StateKey,
    public isLoading: boolean
  ) { }
}

export class ToggleView {
  static readonly type = '[UI] Toggle view';
  constructor(public StateKey: StateKey) { }
}

export class SetProcessingStatus {
  static readonly type = '[UI] Set processing status';
  constructor(
    public StateKey: StateKey,
    public isProcessing: boolean
  ) { }
}

export abstract class BaseUIState<T> {
  constructor(private readonly stateKey: StateKey) { }

  @Action(SetLoadingStatus)
  setLoadingStatus(
    ctx: StateContext<BaseUIStateModel>, 
    action: SetLoadingStatus
  ): void {
    if(action.StateKey !== this.stateKey) return;
   
    ctx.patchState({ 
      isLoading: action.isLoading 
    });
  }

  @Action(ToggleView)
  toggleView(
    ctx: StateContext<BaseUIStateModel>, 
    action: ToggleView
  ): void {
    if(action.StateKey !== this.stateKey) return;
    
    const state = ctx.getState();
    ctx.patchState({ 
      isListView: !state.isListView 
    });
  }

  @Action(SetProcessingStatus)
  setProcessingStatus(
    ctx: StateContext<BaseUIStateModel>, 
    action: SetProcessingStatus
  ): void {
    if(action.StateKey !== this.stateKey) return;
   
    ctx.patchState({ 
      isProcessing: action.isProcessing 
    });
  }
}
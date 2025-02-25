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
import { DeleteHandleStateConfigHelper } from "./delete-handle-state-config.helper";
import { DeleteHandleStateModel } from "./delete-handle-state.model";
import { StateKey } from "../state-key.token";


export class SetDeletableResponse {
  static readonly type = '[DeleteHandle] Set response';
  constructor(public payload: DeletableResponse) { }
}

export class SetDeleteHandleLoadingStatus {
  static readonly type = '[DeleteHandle] Set loading status';
  constructor(public isProcessing: boolean) { }
}

export class SetDeleteHandleProcessingStatus {
  static readonly type = '[DeleteHandle] Set processing status';
  constructor(public isProcessing: boolean) { }
}

export class ResetDeleteHandleState {
  static readonly type = '[DeleteHandle] Reset state';
}

@State<DeleteHandleStateModel>({
  name: StateKey.DELETE_HANDLE,
  defaults: DeleteHandleStateConfigHelper.createDefault()
})
@Injectable()
export class DeleteHandleState {
  @Selector()
  static isDeletable(state: DeleteHandleStateModel): boolean {
    return state.isDeletable;
  }

  @Selector()
  static getErrorMessages(state: DeleteHandleStateModel): string[] {
    return state.errorMessages;
  }

  @Selector()
  static isLoading(state: DeleteHandleStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static isProcessing(state: DeleteHandleStateModel): boolean {
    return state.isProcessing;
  }

  @Action(SetDeletableResponse)
  setDeletableResponse(
    ctx: StateContext<DeleteHandleStateModel>,
    action: SetDeletableResponse
  ): void {
    const { isDeletable, errorMessages } = action.payload;
    ctx.setState({
      isDeletable,
      errorMessages,
      isProcessing: false,
      isLoading: false
    });
  }

  @Action(SetDeleteHandleProcessingStatus)
  setDeleteProcessingStatus(
    ctx: StateContext<DeleteHandleStateModel>,
    action: SetDeleteHandleProcessingStatus
  ): void {
    ctx.patchState({
      isProcessing: action.isProcessing
    });
  }

  @Action(ResetDeleteHandleState)
  resetDeleteHandleState(ctx: StateContext<DeleteHandleStateModel>): void {
    ctx.setState(DeleteHandleStateConfigHelper.createDefault());
  }
}
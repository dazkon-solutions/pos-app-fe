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
import { AlertStateModel } from "./alert-state.model";
import { AlertStateConfigHelper } from "./alert-state-config.helper";
import { StateKey } from "../state-key.token";
import { Alert } from "./alert.interface";
import { 
  AlertMode, 
  AlertType 
} from "./alert.enum";


export class SetAlert {
  static readonly type = '[Alert] Set';
  constructor(
    public type: AlertType,
    public messageKey: string,
    public mode: AlertMode
  ) { }
}

export class ResetAlert {
  static readonly type = '[Alert] Reset';
}

@State<AlertStateModel>({
  name: StateKey.ALERT,
  defaults: AlertStateConfigHelper.createDefault()
})
@Injectable()
export class AlertState {
  @Selector()
  static getList(state: AlertStateModel): Alert[] {
    return state.list;
  }

  @Selector()
  static getNew(state: AlertStateModel): Alert {
    return state.list[0];
  }

  @Action(SetAlert)
  setAlert(
    ctx: StateContext<AlertStateModel>,
    action: SetAlert
  ) {
    const state = ctx.getState();

    const list = state.list;
    const alert: Alert = {
      id: (state.count + 1),
      type: action.type,
      messageKey: action.messageKey,
      mode: action.mode
    };
    const count = list.unshift(alert);

    ctx.patchState({
      list,
      count
    });
  }

  @Action(ResetAlert)
  resetAlert(ctx: StateContext<ResetAlert>) {
    ctx.setState(AlertStateConfigHelper.createDefault());
  }
}
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
import { StateKey } from "../state-key.token";


export class ToggleLeftPanel {
  static readonly type = '[LeftPanel] Toggle';
}

export class ExpendLeftPanel {
  static readonly type = '[LeftPanel] Expand';
}

export class CollapseLeftPanel {
  static readonly type = '[LeftPanel] Collapse';
}

export class ResetLeftPanel {
  static readonly type = '[LeftPanel] Reset';
}

@State<boolean>({
  name: StateKey.LEFT_PANEL,
  defaults: false
})
@Injectable()
export class LeftPanelState {
  @Selector()
  static isExpanded(state: boolean): boolean {
    return state;
  }

  @Action(ToggleLeftPanel)
  toggleLeftPanel(ctx: StateContext<boolean>) {
    const state = ctx.getState();
    const toggled = state ? false : true;
    ctx.setState(toggled);
  }

  @Action(ExpendLeftPanel)
  expendLeftPanel(ctx: StateContext<boolean>) {
    ctx.setState(true);
  }

  @Action(CollapseLeftPanel)
  collapseLeftPanel(ctx: StateContext<boolean>) {
    ctx.setState(true);
  }

  @Action(ResetLeftPanel)
  resetLeftPanel(ctx: StateContext<boolean>) {
    ctx.setState(false);
  }
}
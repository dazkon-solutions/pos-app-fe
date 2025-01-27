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


export class ToggleRightPanel {
  static readonly type = '[RightPanel] Toggle';
}

export class CollapseRightPanel {
  static readonly type = '[RightPanel] Collapse';
}

export class ResetRightPanel {
  static readonly type = '[RightPanel] Reset';
}

@State<boolean>({
  name: StateKey.RIGHT_PANEL,
  defaults: false
})
@Injectable()
export class RightPanelState {
  @Selector()
  static isExpanded(state: boolean): boolean {
    return state;
  }

  @Action(ToggleRightPanel)
  toggleRightPanel(ctx: StateContext<boolean>) {
    const state = ctx.getState();
    const toggled = state ? false : true;
    ctx.setState(toggled);
  }

  @Action(CollapseRightPanel)
  collapseRightPanel(ctx: StateContext<boolean>) {
    const toggled = false;
    ctx.setState(toggled);
  }

  @Action(ResetRightPanel)
  resetRightPanel(ctx: StateContext<boolean>) {
    ctx.setState(false);
  }
}
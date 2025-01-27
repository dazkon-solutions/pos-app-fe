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
import { MenuNode } from "src/app/store/menu-config/menu.interface";
import { MenuStateModel } from "./menu-state.interface";
import { MenuStateConfigHelper } from "./menu-state-config.helper";
import { StateKey } from "../state-key.token";

export class SelectMenuItem {
  static readonly type = '[Menu] Select';
  constructor(public menuNode: MenuNode) { }
}

export class SetMenuParent {
  static readonly type = '[Menu] Set parent';
  constructor(public parentMenuNode: MenuNode) { }
}

export class SetMenuTree {
  static readonly type = '[Menu] Set tree';
  constructor(public list: MenuNode[]) { }
}

export class ResetMenu {
  static readonly type = '[Menu] Reset';
}

@State<MenuStateModel>({
  name: StateKey.MENU,
  defaults: MenuStateConfigHelper.createDefault()
})
@Injectable()
export class MenuState {
  @Selector()
  static getCurrent(state: MenuStateModel): MenuNode | null {
    return state.current;
  }

  @Selector()
  static getParent(state: MenuStateModel): MenuNode | null {
    return state.parent;
  }

  @Selector()
  static getTree(state: MenuStateModel): MenuNode[] {
    return state.tree;
  }

  @Action(SelectMenuItem)
  selectMenuItem(
    ctx: StateContext<MenuStateModel>,
    action: SelectMenuItem
  ) {
    ctx.patchState({
      current: action.menuNode
    });
  }

  @Action(SetMenuParent)
  setMenuParent(
    ctx: StateContext<MenuStateModel>,
    action: SetMenuParent
  ) {
    ctx.patchState({
      parent: action.parentMenuNode
    });
  }

  @Action(SetMenuTree)
  setMenuTree(
    ctx: StateContext<MenuStateModel>,
    action: SetMenuTree
  ): void {
    ctx.patchState({
      tree: action.list,
      isLoaded: true
    });
  }

  @Action(ResetMenu)
  resetMenu(ctx: StateContext<MenuStateModel>) {
    ctx.setState(MenuStateConfigHelper.createDefault());
  }
}
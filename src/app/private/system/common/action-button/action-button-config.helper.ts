/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { LocaleKeys } from "src/app/common/constants";
import { Action } from "src/app/common/enums";
import { 
  ActionButtonShape, 
  ActionButtonType 
} from "./action-button-type.enum";
import { ActionButton } from "./action-button.interface";

export class ActionButtonConfigHelper {
  private static button = {
    add: {
      action: Action.CREATE,
      icon: 'add',
      label: LocaleKeys.labels.buttons.addNew,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: 'btn-fab-primary',
      isDisabled: true
    },
    create: {
      action: Action.CREATE,
      icon: 'save',
      label: LocaleKeys.labels.buttons.save,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: 'btn-fab-primary',
      isDisabled: true
    },
    update: {
      action: Action.UPDATE,
      icon: 'update',
      label: LocaleKeys.labels.buttons.update,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: 'btn-fab-primary',
      isDisabled: true
    },
    view: {
      action: Action.VIEW,
      icon: 'update',
      label: LocaleKeys.labels.buttons.view,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: 'btn-fab-primary',
      isDisabled: true
    },
    deleteFab: {
      action: Action.DELETE,
      icon: 'delete',
      label: '',
      tooltip: LocaleKeys.tooltips.delete,
      shape: ActionButtonShape.MINI_FAB,
      style: 'btn-mini-fab-warn',
      isDisabled: true
    }
  }

  static createButton(type: ActionButtonType): ActionButton {
    return this.button[type];
  }
}
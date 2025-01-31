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
  ActionButtonStyleClass 
} from "./action-button-type.enum";
import { 
  ActionButton, 
  ActionButtonConfig 
} from "./action-button.interface";

export class ActionButtonConfigHelper {
  private static button = {
    add: {
      action: Action.CREATE,
      icon: 'add',
      label: LocaleKeys.labels.buttons.addNew,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    create: {
      action: Action.CREATE,
      icon: 'save',
      label: LocaleKeys.labels.buttons.save,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    update: {
      action: Action.UPDATE,
      icon: 'update',
      label: LocaleKeys.labels.buttons.update,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    view: {
      action: Action.VIEW,
      icon: 'view',
      label: LocaleKeys.labels.buttons.view,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    deleteFab: {
      action: Action.DELETE,
      icon: 'delete',
      label: '',
      tooltip: LocaleKeys.tooltips.delete,
      shape: ActionButtonShape.MINI_FAB,
      style: ActionButtonStyleClass.BTN_MINI_FAB_WARN
    }
  }

  static createButton(config: ActionButtonConfig): ActionButton {
    return config.customButton
      ? config.customButton
      : this.button[config.type];
  }
}
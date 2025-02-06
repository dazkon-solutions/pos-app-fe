/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { LocaleKeys } from "src/app/common/constants";
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
      icon: 'add',
      label: LocaleKeys.labels.buttons.addNew,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    create: {
      icon: 'save',
      label: LocaleKeys.labels.buttons.save,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    update: {
      icon: 'update',
      label: LocaleKeys.labels.buttons.update,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    view: {
      icon: '',
      label: LocaleKeys.labels.buttons.view,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_PRIMARY
    },
    delete: {
      icon: 'delete',
      label: LocaleKeys.labels.buttons.delete,
      tooltip: '',
      shape: ActionButtonShape.FAB_EXTENDED,
      style: ActionButtonStyleClass.BTN_FAB_WARN
    },
    deleteFab: {
      icon: 'delete',
      label: '',
      tooltip: LocaleKeys.tooltips.delete,
      shape: ActionButtonShape.MINI_FAB,
      style: ActionButtonStyleClass.BTN_MINI_FAB_WARN
    },
    deleteMenuItem: {
      icon: 'delete',
      label: LocaleKeys.labels.buttons.delete,
      tooltip: '',
      shape: ActionButtonShape.MENU_ITEM,
      style: ActionButtonStyleClass.NONE
    }
  }

  static createButton(config: ActionButtonConfig): ActionButton {
    return config.customButton
      ? config.customButton
      : this.button[config.type];
  }

  static setDisabled(
    config: ActionButtonConfig,
    element: any
  ): ActionButtonConfig {
    const isDisabled = config.disableCondition 
      ? config.disableCondition(element)
      : false;

    config.isDisabled = isDisabled;

    return config;
  }
}
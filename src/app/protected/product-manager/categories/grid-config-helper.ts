/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Resource } from "src/app/common/enums";
import { ActionButtonType } from "src/app/private/system/common/action-button";
import { DynamicGridItemConfig } from "src/app/private/system/common/dynamic-grid";

export class GridConfigHelper {
  static create(resource: Resource): DynamicGridItemConfig {
    return {
      titleKey: 'name',
      subTitleKey: 'weight',
      imageKey: 'photo',
      primaryActionButtonConfig: {
        resource,
        type: ActionButtonType.VIEW
      },
      secondaryActionButtonConfig: {
        resource,
        type: ActionButtonType.VIEW,
        disableCondition: (rowData: any) => rowData.position === 1
      },
      optionActionButtonConfigs: [
        {
          resource,
          type: ActionButtonType.VIEW
        },
        {
          resource,
          type: ActionButtonType.DELETE,
          disableCondition: (rowData: any) => rowData.position === 1
        }
      ]
    }
  }
}
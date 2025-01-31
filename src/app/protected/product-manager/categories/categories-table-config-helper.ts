/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  CustomAction, 
  Resource 
} from "src/app/common/enums";
import { 
  ActionButtonShape, 
  ActionButtonStyleClass, 
  ActionButtonType 
} from "src/app/private/system/common/action-button";
import { 
  DynamicTableColumnConfig, 
  DynamicTableColumnType,
  TableColumnAlignmentStyleClass
} from "src/app/private/system/common/dynamic-table";

export class CategoriesTableConfigHelper {
  static createTableColumns(resource: Resource): DynamicTableColumnConfig[] {
    return [
      {
        name: 'photo',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.IMAGE,
        isVisibleHeader: true
      },
      {
        name: 'position',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        name: 'name',
        alignment: TableColumnAlignmentStyleClass.CENTER,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        name: 'weight',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        name: 'symbol',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        name: 'createAction',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.ACTION_BUTTON,
        isVisibleHeader: false,
        actionButtonConfig: {
          resource,
          type: ActionButtonType.VIEW
        }
      },
      {
        name: 'deleteAction',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.ACTION_BUTTON,
        isVisibleHeader: false,
        actionButtonConfig: {
          resource,
          type: ActionButtonType.DELETE_FAB
        }
      },
      {
        name: 'customAction',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.ACTION_BUTTON,
        isVisibleHeader: false,
        actionButtonConfig: {
          resource,
          type: ActionButtonType.DELETE_FAB,
          disableCondition: (rowData: any) => rowData.position === 1,
          customButton: {
            action: CustomAction.CUSTOM_1,
            icon: 'bell',
            label: 'subscribe',
            shape: ActionButtonShape.FAB_EXTENDED,
            style: ActionButtonStyleClass.BTN_FAB_PRIMARY,
            tooltip: 'testing'
          }
        }
      }
    ]
  }
}
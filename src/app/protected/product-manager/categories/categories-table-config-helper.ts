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
        label: 'tast label 1',
        nameKey: 'photo',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.IMAGE,
        isVisibleHeader: true
      },
      {
        label: 'tast label 2',
        nameKey: 'position',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        label: 'tast label 3',
        nameKey: 'name',
        alignment: TableColumnAlignmentStyleClass.CENTER,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        label: 'tast label 4',
        nameKey: 'weight',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        label: 'tast label 5',
        nameKey: 'symbol',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.TEXT,
        isVisibleHeader: true
      },
      {
        label: 'tast label 6',
        nameKey: 'createAction',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.ACTION_BUTTON,
        isVisibleHeader: false,
        actionButtonConfig: {
          resource,
          type: ActionButtonType.VIEW
        }
      },
      {
        label: 'tast label 7',
        nameKey: 'deleteAction',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.ACTION_BUTTON,
        isVisibleHeader: false,
        actionButtonConfig: {
          resource,
          type: ActionButtonType.DELETE_FAB
        }
      },
      {
        label: 'tast label 8',
        nameKey: 'customAction',
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
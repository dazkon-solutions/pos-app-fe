/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  DynamicTableColumnConfig, 
  DynamicTableColumnType,
  TableColumnAlignmentStyleClass
} from "src/app/private/system/common/dynamic-table";

export class CategoriesTableConfigHelper {
  static createTableColumns(): DynamicTableColumnConfig[] {
    return [
      {
        name: 'position',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.TEXT
      },
      {
        name: 'name',
        alignment: TableColumnAlignmentStyleClass.CENTER,
        type: DynamicTableColumnType.TEXT
      },
      {
        name: 'weight',
        alignment: TableColumnAlignmentStyleClass.RIGHT,
        type: DynamicTableColumnType.TEXT
      },
      {
        name: 'symbol',
        alignment: TableColumnAlignmentStyleClass.LEFT,
        type: DynamicTableColumnType.TEXT
      }
    ]
  }
}
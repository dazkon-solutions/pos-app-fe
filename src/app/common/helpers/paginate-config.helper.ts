/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { PageEvent } from "@angular/material/paginator";
import { PaginateRequest } from "../interfaces";

export class PaginateConfigHelper {
  static createDefault(): PaginateRequest {
    return {
      pageNo: 1,
      pageSize: 20,
      total: 0
    };
  }

  static noPaginatePageEvent(): PageEvent {
    return {
      length: 0,
      pageIndex: -1,
      pageSize: 0
    };
  }

  static paginate<T>(
    items: T[], 
    responsePaginate: PaginateRequest = this.createDefault()
  ): T[] {
    const { pageNo, pageSize } = responsePaginate;

    const startIndex = (pageNo - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }
}
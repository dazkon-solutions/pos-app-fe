/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { DeletableResponse } from "./deletable-response.interface";
import { PaginateResponse } from "./paginate.interface";

export interface ExpenseType {
  id:   number;
  name: string;
}

export interface ExpenseTypeResponse {
  expenseType: ExpenseType;
  success:     boolean;
}

export interface PaginatedExpenseTypeResponse {
  expenseTypes:  ExpenseType[];
  meta:          PaginateResponse;
}

export interface ExpenseTypeDeletableResponse {
  expenseType:  DeletableResponse;
  success:      boolean;
}

export interface ExpenseTypeFilterTerms {
  name: string;
}
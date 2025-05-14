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

export interface Bank {
  id:   number;
  name: string;
}

export interface BankResponse {
  bank:     Bank;
  success:  boolean;
}

export interface PaginatedBankResponse {
  banks:  Bank[];
  meta:   PaginateResponse;
}

export interface BankDeletableResponse {
  bank:    DeletableResponse;
  success: boolean;
}

export interface BankFilterTerms {
  name: string;
}
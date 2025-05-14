/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Bank,
  BankFilterTerms,
  PaginateRequest
} from "src/app/common/interfaces";

export interface BankStateModel { 
  list:         Bank[];
  current:      Bank | null;
  isLoaded:     boolean;
  isFiltered:   boolean;
  filterTerms:  BankFilterTerms;
  paginate:     PaginateRequest;
}
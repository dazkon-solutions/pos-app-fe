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

export interface ProductBrand {
  id:   number;
  name: string;
}

export interface ProductBrandResponse {
  brand:    ProductBrand;
  success:  true;
}

export interface PaginatedProductBrandResponse {
  brands: ProductBrand[];
  meta:   PaginateResponse;
}

export interface ProductBrandDeletableResponse {
  brand:   DeletableResponse;
  success: true;
}

export interface ProductBrandFilterTerms {
  name: string;
}
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

export interface ProductCategory {
  id:               number;
  name:             string;
  nameLocal:        string;
  description:      string;
  descriptionLocal: string;
}

export interface ProductCategoryResponse {
  category: ProductCategory;
  success:  boolean;
}

export interface PaginatedProductCategoryResponse {
  categories: ProductCategory[];
  meta:       PaginateResponse;
}

export interface ProductCategoryDeletableResponse {
  category: DeletableResponse;
  success:  boolean;
}

export interface ProductCategoryFilterTerms {
  name: string;
}
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  inject, 
  Injectable 
} from "@angular/core";
import { Observable } from "rxjs";
import { 
  PaginatedProductCategoryResponse,
  PaginateRequest,
  ProductCategory,
  ProductCategoryDeletableResponse,
  ProductCategoryResponse, 
} from "src/app/common/interfaces";
import { ApiProviderService } from "src/app/common/services/api-provider.service";
import { Endpoint } from "src/app/store/endpoint-config";


@Injectable({ 
  providedIn: 'root'
})
export class ProductCategoryCtrlService {
  private api = inject(ApiProviderService);

  fetchAll(
    paginate: PaginateRequest,
    searchTerm?: string
  ): Observable<PaginatedProductCategoryResponse> {
    const params = {
      searchTerm: searchTerm ?? '',
      pageNo: paginate.pageNo, 
      pageSize: paginate.pageSize, 
    };

    return this.api.get<PaginatedProductCategoryResponse>(Endpoint.CATEGORIES_FETCH_ALL,
                                                          params);
  }

  fetchById(id: number): Observable<ProductCategoryResponse> {
    const params = { id };
    return this.api.get<ProductCategoryResponse>(Endpoint.CATEGORIES_FETCH_BY_ID,
                                                 params);
  }

  create(category: ProductCategory): Observable<ProductCategoryResponse> {
    return this.api.post<ProductCategoryResponse>(Endpoint.CATEGORIES_CREATE,
                                                  category);
  }

  update(category: ProductCategory): Observable<ProductCategoryResponse> {
    const params = { id: category.id };
    return this.api.update<ProductCategoryResponse>(Endpoint.CATEGORIES_UPDATE,
                                                    category,
                                                    params);
  }

  deleteById(id: number): Observable<boolean> {
    const params = { id };
    return this.api.delete<boolean>(Endpoint.CATEGORIES_DELETE,
                                    params);
  }

  checkDeletable(id: number): Observable<ProductCategoryDeletableResponse> {
    const params = { id };
    return this.api.get<ProductCategoryDeletableResponse>(Endpoint.CATEGORIES_CHECK_DELETABLE,
                                                          params);
  }
}
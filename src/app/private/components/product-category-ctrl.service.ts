/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { 
  DeletableResponse,
  PaginatedProductCategory,
  PaginateResponse, 
  ProductCategory, 
  ProductCategoryFilterTerms 
} from "src/app/common/interfaces";
import { ApiProviderService } from "src/app/common/services/api-provider.service";
import { Endpoint } from "src/app/store/endpoint-config";


@Injectable({ 
  providedIn: 'root'
})
export class ProductCategoryCtrlService {
  constructor(private api: ApiProviderService) { }

  fetchAll(
    paginate: PaginateResponse,
    filterTerms: ProductCategoryFilterTerms
  ): Observable<PaginatedProductCategory> {
    const params = {
      pageNo: paginate.pageNo, 
      pageSize: paginate.pageSize, 
      name: filterTerms.name 
    };

    return this.api
      .get<PaginatedProductCategory>(Endpoint.CATEGORIES_GET_PAGINATED,
                                     params);
  }

  fetchById(id: number): Observable<ProductCategory> {
    const params = { id };
    return this.api.get<ProductCategory>(Endpoint.CATEGORIES_VIEW,
                                         params);
  }

  create(data: ProductCategory): Observable<ProductCategory> {
    return this.api.post<ProductCategory>(Endpoint.CATEGORIES_CREATE,
                                          data);
  }

  update(data: ProductCategory): Observable<ProductCategory> {
    const params = { id: data.id };
    return this.api.update<ProductCategory>(Endpoint.CATEGORIES_UPDATE,
                                            data,
                                            params);
  }

  isDeletable(id: number): Observable<DeletableResponse> {
    const params = { id };
    return this.api.get<DeletableResponse>(Endpoint.CATEGORIES_IS_DELETABLE,
                                           params);
  }

  deleteById(id: number): Observable<boolean> {
    const params = { id };
    return this.api.delete<boolean>(Endpoint.CATEGORIES_DELETE,
                                    params);
  }
}
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
  PaginatedProductBrandResponse,
  PaginateRequest, 
  ProductBrand, 
  ProductBrandDeletableResponse, 
  ProductBrandResponse
} from "src/app/common/interfaces";
import { ApiProviderService } from "src/app/common/services/api-provider.service";
import { Endpoint } from "src/app/store/endpoint-config";


@Injectable({ 
  providedIn: 'root'
})
export class ProductBrandCtrlService {
  private api = inject(ApiProviderService);

  fetchAll(
    paginate: PaginateRequest,
    searchTerm?: string
  ): Observable<PaginatedProductBrandResponse> {
    const params = {
      searchTerm: searchTerm ?? '',
      pageNo: paginate.pageNo, 
      pageSize: paginate.pageSize, 
    };

    return this.api.get<PaginatedProductBrandResponse>(Endpoint.BRANDS_FETCH_ALL,
                                                       params);
  }

  fetchById(id: number): Observable<ProductBrandResponse> {
    const params = { id };
    return this.api.get<ProductBrandResponse>(Endpoint.BRANDS_FETCH_BY_ID,
                                              params);
  }

  create(brand: ProductBrand): Observable<ProductBrandResponse> {
    return this.api.post<ProductBrandResponse>(Endpoint.BRANDS_CREATE,
                                               brand);
  }

  update(brand: ProductBrand): Observable<ProductBrandResponse> {
    const params = { id: brand.id };
    return this.api.update<ProductBrandResponse>(Endpoint.BRANDS_UPDATE,
                                                 brand,
                                                 params);
  }

  deleteById(id: number): Observable<boolean> {
    const params = { id };
    return this.api.delete<boolean>(Endpoint.BRANDS_DELETE,
                                    params);
  }

  checkDeletable(id: number): Observable<ProductBrandDeletableResponse> {
    const params = { id };
    return this.api.get<ProductBrandDeletableResponse>(Endpoint.BRANDS_CHECK_DELETABLE,
                                                       params);
  }
}
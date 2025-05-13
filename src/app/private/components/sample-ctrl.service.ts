/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiProviderService } from "src/app/common/services/api-provider.service";
import { Endpoint } from "src/app/store/endpoint-config";


@Injectable({ 
  providedIn: 'root'
})
export class SampleCtrlService {
  constructor(private api: ApiProviderService) { }

  fetchAll(
    paginate: any,
    filterTerms: any
  ): Observable<any> {
    const params = {
      pageNo: paginate.pageNo, 
      pageSize: paginate.pageSize, 
      name: filterTerms.name 
    };

    return this.api
      .get<any>(Endpoint.SAMPLES_GET_PAGINATED,
                                     params);
  }

  fetchById(id: number): Observable<any> {
    const params = { id };
    return this.api.get<any>(Endpoint.SAMPLES_VIEW,
                                         params);
  }

  create(data: any): Observable<any> {
    return this.api.post<any>(Endpoint.SAMPLES_CREATE,
                                          data);
  }

  update(data: any): Observable<any> {
    const params = { id: data.id };
    return this.api.update<any>(Endpoint.SAMPLES_UPDATE,
                                            data,
                                            params);
  }

  isDeletable(id: number): Observable<any> {
    const params = { id };
    // return this.api.get<DeletableResponse>(Endpoint.CATEGORIES_IS_DELETABLE,
    //                                        params);
    const res: any = {
      isDeletable: true,
      blockers: ['delete delete']
    };
    return of(res)
  }

  deleteById(id: number): Observable<boolean> {
    const params = { id };
    return this.api.delete<boolean>(Endpoint.SAMPLES_DELETE,
                                    params);
  }
}
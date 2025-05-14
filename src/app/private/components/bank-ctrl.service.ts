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
  Bank,
  BankDeletableResponse,
  BankResponse,
  PaginatedBankResponse,
  PaginateRequest
} from "src/app/common/interfaces";
import { ApiProviderService } from "src/app/common/services/api-provider.service";
import { Endpoint } from "src/app/store/endpoint-config";


@Injectable({ 
  providedIn: 'root'
})
export class BankCtrlService {
  private api = inject(ApiProviderService);

  fetchAll(
    paginate: PaginateRequest,
    searchTerm?: string
  ): Observable<PaginatedBankResponse> {
    const params = {
      searchTerm: searchTerm ?? '',
      pageNo: paginate.pageNo, 
      pageSize: paginate.pageSize, 
    };

    return this.api.get<PaginatedBankResponse>(Endpoint.BANKS_FETCH_ALL,
                                               params);
  }

  fetchById(id: number): Observable<BankResponse> {
    const params = { id };
    return this.api.get<BankResponse>(Endpoint.BANKS_FETCH_BY_ID,
                                      params);
  }

  create(bank: Bank): Observable<BankResponse> {
    return this.api.post<BankResponse>(Endpoint.BANKS_CREATE,
                                       bank);
  }

  update(bank: Bank): Observable<BankResponse> {
    const params = { id: bank.id };
    return this.api.update<BankResponse>(Endpoint.BANKS_UPDATE,
                                         bank,
                                         params);
  }

  deleteById(id: number): Observable<boolean> {
    const params = { id };
    return this.api.delete<boolean>(Endpoint.BANKS_DELETE,
                                    params);
  }

  checkDeletable(id: number): Observable<BankDeletableResponse> {
    const params = { id };
    return this.api.get<BankDeletableResponse>(Endpoint.BANKS_CHECK_DELETABLE,
                                               params);
  }
}
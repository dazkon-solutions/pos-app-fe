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
  ExpenseType,
  ExpenseTypeDeletableResponse,
  ExpenseTypeResponse,
  PaginatedExpenseTypeResponse,
  PaginateRequest
} from "src/app/common/interfaces";
import { ApiProviderService } from "src/app/common/services/api-provider.service";
import { Endpoint } from "src/app/store/endpoint-config";


@Injectable({ 
  providedIn: 'root'
})
export class ExpenseTypeCtrlService {
  private api = inject(ApiProviderService);

  fetchAll(
    paginate: PaginateRequest,
    searchTerm?: string
  ): Observable<PaginatedExpenseTypeResponse> {
    const params = {
      searchTerm: searchTerm ?? '',
      pageNo: paginate.pageNo, 
      pageSize: paginate.pageSize, 
    };

    return this.api.get<PaginatedExpenseTypeResponse>(Endpoint.EXPENSE_TYPES_FETCH_ALL,
                                                      params);
  }

  fetchById(id: number): Observable<ExpenseTypeResponse> {
    const params = { id };
    return this.api.get<ExpenseTypeResponse>(Endpoint.EXPENSE_TYPES_FETCH_BY_ID,
                                             params);
  }

  create(type: ExpenseType): Observable<ExpenseTypeResponse> {
    return this.api.post<ExpenseTypeResponse>(Endpoint.EXPENSE_TYPES_CREATE,
                                              type);
  }

  update(type: ExpenseType): Observable<ExpenseTypeResponse> {
    const params = { id: type.id };
    return this.api.update<ExpenseTypeResponse>(Endpoint.EXPENSE_TYPES_UPDATE,
                                                type,
                                                params);
  }

  deleteById(id: number): Observable<boolean> {
    const params = { id };
    return this.api.delete<boolean>(Endpoint.EXPENSE_TYPES_DELETE,
                                    params);
  }

  checkDeletable(id: number): Observable<ExpenseTypeDeletableResponse> {
    const params = { id };
    return this.api.get<ExpenseTypeDeletableResponse>(Endpoint.EXPENSE_TYPES_CHECK_DELETABLE,
                                                      params);
  }
}
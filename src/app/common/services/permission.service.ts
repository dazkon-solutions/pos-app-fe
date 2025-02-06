/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { 
  map, 
  Observable 
} from "rxjs";
import { PermissionState } from "src/app/store/permission";
import { Action } from "../enums";


@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions$: Observable<Action[]>;

  constructor(private store: Store) { 
    this.permissions$ = this.store.select(PermissionState.getList);
  }

  hasPermission(action: Action): Observable<boolean> {
    return this.permissions$.pipe(map(permissions => 
      permissions.includes(action)));
  }
}
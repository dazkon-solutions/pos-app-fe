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
import { Store } from "@ngxs/store";
import { PermissionState } from "src/app/store/permission";
import { Permission } from "../enums";


@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private store = inject(Store);
  private permissions = this.store.selectSignal(PermissionState.getList);
  
  // Action type = DEFAULT; should allow
  hasPermission(permission: Permission): boolean {
    if (permission === Permission.DEFAULT) return true;
    
    return this.permissions().includes(permission) ?? false;
  }
}
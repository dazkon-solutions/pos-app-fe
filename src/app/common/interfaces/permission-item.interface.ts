/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Action, 
  Resource 
} from "src/app/common/enums";

export interface PermissionItem {
  pid:          number;
  resource:     Resource;
  actions: {
    action:     Action;
    isActive:   boolean;
    isDisabled: boolean;
  }[]
}

export interface ResourceAction {
  resource:   Resource;
  actions:    Action[];
  pid:        number;
}

export interface PermissionUpdateRequest {
  userRoleId:     number;
  actionName:     Action;
  feResourceName: Resource;
}
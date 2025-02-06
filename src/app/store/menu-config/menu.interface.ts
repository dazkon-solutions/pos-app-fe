/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Action, Resource } from "src/app/common/enums";

export interface MenuNode {
  uid:          number;
  pid:          number;
  name:         string;
  description:  string;
  resource:     Resource;
  action:       Action;
  icon?:        string;
  children?:    MenuNode[];
  route?:       string;
}
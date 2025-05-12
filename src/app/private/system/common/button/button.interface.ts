/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Permission } from "src/app/common/enums";
import { 
  ButtonStyleClass, 
  ButtonType 
} from "./button-type.enum";

export interface ButtonConfig {
  type:         ButtonType;
  label?:       string;
  icon?:        string;
  tooltip?:     string;
  styleClass?:  ButtonStyleClass;
  permission?:  Permission;
  isLoading?:   boolean;
  isDisabled?:  boolean;
}
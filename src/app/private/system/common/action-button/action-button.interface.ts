/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Action } from "src/app/common/enums";
import { 
  ActionButtonShape, 
  ActionButtonType, 
  ActionButtonStyleClass
} from "./action-button-type.enum";

export interface ActionButtonConfig {
  type:               ActionButtonType;
  action:             Action;
  isDisabled?:        boolean;
  disableCondition?:  (rowData: any) => boolean; // Use in dynamic grid
  customButton?:      ActionButton;
}

export interface ActionButton {
  icon:    string;
  tooltip: string;
  label:   string;
  shape:   ActionButtonShape;
  style:   ActionButtonStyleClass;
}
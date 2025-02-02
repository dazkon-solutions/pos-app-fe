/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { ActionButtonConfig } from "../action-button";

export interface DynamicGridItemConfig {
  titleKey:                     string;
  primaryActionButtonConfig:    ActionButtonConfig;
  secondaryActionButtonConfig?: ActionButtonConfig;
  optionActionButtonConfigs?:   ActionButtonConfig[];
  subTitleKey?:                 string;
  imageKey?:                    string;
}
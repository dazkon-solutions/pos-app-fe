/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { LocaleKeys } from "src/app/common/constants";
import { AnimationType } from "./animation-type.enum";


export interface CustomAnimationConfig {
  type:   AnimationType;
  path:   string;
  width:  string;
  height: string;
  title?: string;
}

export class AnimationConfigHelper {
  static createList(): CustomAnimationConfig[] {
    return [
      {
        type: AnimationType.NO_DATA_FOUND,
        path: 'animations/no-data-found.json',
        width: '400px',
        height: '400px',
        title: LocaleKeys.titles.noDataFound
      }
    ];
  }

  static createDefault(): CustomAnimationConfig {
    const list = this.createList();
    return list[0];
  }

  static createByAnimationType(type: AnimationType): CustomAnimationConfig {
    const list = this.createList();
    return list.find(config => config.type === type) || this.createDefault();
  }
}
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { LocaleKeys } from "src/app/common/constants";
import { BottomMenuNode } from "./bottom-menu.interface";


export class BottomMenuConfigHelper {
  static createBottomMenu(): BottomMenuNode[] {
    return [
      {
        uid: 1,
        name: LocaleKeys.titles.mainMenu.helpDesk,
        description: LocaleKeys.titles.mainMenu.helpDesk,
        icon: 'help'
      },
      {
        uid: 2,
        name: LocaleKeys.titles.mainMenu.settings,
        description: LocaleKeys.titles.mainMenu.settings,
        icon: 'settings'
      }
    ];
  }
}
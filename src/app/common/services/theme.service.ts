/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { 
  firstValueFrom, 
  Observable 
} from "rxjs";
import { Store } from "@ngxs/store";
import { AppearanceState } from "src/app/store";


@Injectable({ 
  providedIn: 'root'
})
export class ThemeService {
  constructor(private store: Store) { }

  isLightTheme$(): Observable<boolean>  {
    return this.store.select(AppearanceState.isLightTheme);
  }

  async isLightThemeAsync(): Promise<boolean> {
    return await firstValueFrom(
      this.store.selectOnce(AppearanceState.isLightTheme));
  }
}
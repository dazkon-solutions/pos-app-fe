/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { DestroyRef, Injectable } from "@angular/core";
import { 
  BehaviorSubject,
  firstValueFrom, 
  Observable 
} from "rxjs";
import { Store } from "@ngxs/store";
import { AppearanceState } from "src/app/store/appearance";
import { ThemeService } from "./theme.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


@Injectable({ 
  providedIn: 'root'
})
export class TableService {
  tableHeaderColor$ = new BehaviorSubject<string>('');

  private readonly DARK = '#000100';
  private readonly LIGHT = '#F3F3F3';

  constructor(
    private destroyRef: DestroyRef,
    private themeSvc: ThemeService,
  ) { 
    this.themeSvc.isLightTheme$()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(isLightTheme => this.setHeaderColor(isLightTheme));
  }

  private setHeaderColor(isLightTheme: boolean): void {
    const color = isLightTheme ? this.LIGHT : this.DARK;
    this.tableHeaderColor$.next(color);
  }
}
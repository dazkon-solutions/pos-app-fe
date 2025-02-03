/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, 
  DestroyRef, 
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ThemeService } from 'src/app/common/services';
import { ArrayUtil } from 'src/app/common/utils';
import { SkeletonConfigHelper } from '../skeleton-config.helper';


@Component({
  selector: 'daz-table-skeleton-with-image',
  imports: [
    CORE_IMPORTS,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './table-skeleton-with-image.component.html',
  styleUrl: './table-skeleton-with-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSkeletonWithImageComponent implements 
  OnInit,
  OnChanges 
{
  @Input('count')
  count = 1;

  loadingItems: any[] = [];
  circleTheme = { };
  lineTheme = { };

  constructor(
    private destroyRef: DestroyRef,
    private themeSvc: ThemeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.themeSvc.isLightTheme$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isLightTheme => this.createTheme(isLightTheme));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('count' in changes) {
      this.loadingItems = ArrayUtil.createFakeArray(this.count);
    }
  }

  private async createTheme(isLightTheme: boolean): Promise<void> {
    this.circleTheme = {
      width: '52px',
      height: '52px',
      'background': isLightTheme 
        ? '' 
        : SkeletonConfigHelper.darkBgColor,
    };

    this.lineTheme = {
      height: '52px',
      margin: 0,
      'background': isLightTheme 
        ? '' 
        : SkeletonConfigHelper.darkBgColor,
    };

    this.cdr.detectChanges();
  }
}
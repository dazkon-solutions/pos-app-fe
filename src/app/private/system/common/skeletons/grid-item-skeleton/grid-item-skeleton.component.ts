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
import { ThemeService } from 'src/app/common/services';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { SkeletonConfigHelper } from '../skeleton-config.helper';
import { GRID_ITEM_SKELETON_MAT_IMPORTS } from './grid-item-skeleton-imports';
import { GridItemSkeletonType } from './grid-item-skeleton-type.enum';


@Component({
  selector: 'daz-grid-item-skeleton',
  standalone: true,
  imports: [
    CORE_IMPORTS,
    GRID_ITEM_SKELETON_MAT_IMPORTS,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './grid-item-skeleton.component.html',
  styleUrl: './grid-item-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemSkeletonComponent implements 
  OnInit,
  OnChanges
{
  @Input({ 
    alias: 'skeletonType', 
    required: true 
  })
  skeletonType!: GridItemSkeletonType;
  
  circleTheme = { };
  lineTheme = { };
  type = GridItemSkeletonType.NAME_CARD;
  GridItemSkeletonType = GridItemSkeletonType;

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
    if('skeletonType' in changes) {
      this.type = this.skeletonType;
    }
  }

  private async createTheme(isLightTheme: boolean): Promise<void> {
    this.circleTheme = {
      width: '80px',
      height: '80px',
      'background-color': isLightTheme 
        ? '' 
        : SkeletonConfigHelper.darkBgColor
    };

    this.lineTheme = {
      height: '20px',
      margin: 0,
      'background-color': isLightTheme 
        ? '' 
        : SkeletonConfigHelper.darkBgColor
    };

    this.cdr.detectChanges();
  }
}
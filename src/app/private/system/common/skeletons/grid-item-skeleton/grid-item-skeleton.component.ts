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
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngxs/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { AppearanceState } from 'src/app/store/appearance';
import { SkeletonConfigHelper } from '../skeleton-config.helper';
import { GridItemSkeletonType } from './grid-item-skeleton-type.enum';


@Component({
  selector: 'daz-grid-item-skeleton',
  imports: [
    CORE_IMPORTS,
    MatCardModule,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './grid-item-skeleton.component.html',
  styleUrl: './grid-item-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemSkeletonComponent {
  private store = inject(Store);
  private isLightTheme = this.store.selectSignal(AppearanceState.isLightTheme);

  type = input.required<GridItemSkeletonType>();
  
  circleTheme = computed(() => ({
    width: '80px',
    height: '80px',
    'background-color': this.isLightTheme()
      ? '' 
      : SkeletonConfigHelper.darkBgColor
  }));

  lineTheme = computed(() => ({
    height: '20px',
    margin: 0,
    'background-color': this.isLightTheme()
      ? '' 
      : SkeletonConfigHelper.darkBgColor
  }));

  GridItemSkeletonType = GridItemSkeletonType;
}
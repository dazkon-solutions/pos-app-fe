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
import { Store } from '@ngxs/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppearanceState } from 'src/app/store/appearance';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
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
export class TableSkeletonWithImageComponent {
  private store = inject(Store);
  private isLightTheme = this.store.selectSignal(AppearanceState.isLightTheme);

  count = input.required<number>();

  loadingItems = computed(() => ArrayUtil.createFakeArray(this.count()));
  circleTheme = computed(() => ({
    width: '52px',
    height: '52px',
    'background': this.isLightTheme()
      ? '' 
      : SkeletonConfigHelper.darkBgColor,
  }));

  lineTheme = computed(() => ({
    height: '52px',
    margin: 0,
    'background': this.isLightTheme()
      ? '' 
      : SkeletonConfigHelper.darkBgColor,
  }));
}
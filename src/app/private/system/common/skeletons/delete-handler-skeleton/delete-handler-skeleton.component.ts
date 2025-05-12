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
  inject
} from '@angular/core';
import { Store } from '@ngxs/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { AppearanceState } from 'src/app/store/appearance';
import { SkeletonConfigHelper } from '../skeleton-config.helper';


@Component({
  selector: 'daz-delete-handler-skeleton',
  imports: [
    CORE_IMPORTS,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './delete-handler-skeleton.component.html',
  styleUrl: './delete-handler-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteHandleSkeletonComponent {
  private store = inject(Store);
  private isLightTheme = this.store.selectSignal(AppearanceState.isLightTheme);
  
  iconTheme = computed(() => ({
    width: '100px',
    height: '100px',
    'background': this.isLightTheme()
      ? '' 
      : SkeletonConfigHelper.darkBgColor,
  }));
  contentTheme = computed(() => ({
    height: '25px',
    margin: 0,
    'background': this.isLightTheme() 
      ? '' 
      : SkeletonConfigHelper.darkBgColor,
  }));
  actionsTheme = computed(() => ({
    height: '36px',
      width: '100px',
      margin: '5px',
      'background': this.isLightTheme()  
        ? '' 
        : SkeletonConfigHelper.darkBgColor,
  }));
}
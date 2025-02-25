/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  ChangeDetectorRef,
  Component, 
  DestroyRef, 
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ThemeService } from 'src/app/common/services';
import { SkeletonConfigHelper } from '../skeleton-config.helper';


@Component({
  selector: 'daz-delete-handler-skeleton',
  imports: [
    CORE_IMPORTS,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './delete-handler-skeleton.component.html',
  styleUrl: './delete-handler-skeleton.component.scss'
})
export class DeleteHandleSkeletonComponent implements OnInit {
  loadingItems: any[] = [];
  iconTheme = { };
  contentTheme = { };
  actionsTheme = { };

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

  private async createTheme(isLightTheme: boolean): Promise<void> {
    this.iconTheme = {
      width: '100px',
      height: '100px',
      'background': isLightTheme 
        ? '' 
        : SkeletonConfigHelper.darkBgColor,
    };

    this.contentTheme = {
      height: '25px',
      margin: 0,
      'background': isLightTheme 
        ? '' 
        : SkeletonConfigHelper.darkBgColor,
    };

    this.actionsTheme = {
      height: '36px',
      width: '100px',
      margin: '5px',
      'background': isLightTheme 
        ? '' 
        : SkeletonConfigHelper.darkBgColor,
    };

    this.cdr.detectChanges();
  }
}
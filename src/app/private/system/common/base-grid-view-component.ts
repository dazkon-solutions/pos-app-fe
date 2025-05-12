/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Component, 
  inject, 
  input, 
  signal,
  ViewChild
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Action } from 'src/app/common/enums';
import { ActionService } from 'src/app/common/services';
import { ArrayUtil } from 'src/app/common/utils';
import { LocaleKeys } from 'src/app/common/constants';
import { AnimationType } from './animation-player';
import { GridItemSkeletonType } from './skeletons/grid-item-skeleton';

@Component({
  template: ''
})
export abstract class BaseGridViewComponent<T> {
  protected actionSvc = inject(ActionService);
  
  @ViewChild(MatMenuTrigger) 
  optionMenu!: MatMenuTrigger;

  dataSource = input.required<T[]>();
  isLoading = input.required<boolean>();

  defaultLoadingItems = signal<any>(ArrayUtil.createFakeArray(25));

  GridItemSkeletonType = GridItemSkeletonType;
  AnimationType = AnimationType;
  LocaleKeys = LocaleKeys;
  Action = Action;

  trackById(index: number, item: any): number {
    return item.id;
  }

  buttonClicked(
    action: Action, 
    payload: T
  ): void {
    this.actionSvc.emitAction({ 
      action,
      payload
    });

    this.optionMenu.closeMenu();
  }
}
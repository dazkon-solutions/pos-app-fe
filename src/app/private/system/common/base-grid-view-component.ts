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
  Input,
  ViewChild
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { 
  BehaviorSubject,
  Observable 
} from 'rxjs';
import { Action } from 'src/app/common/enums';
import { ActionService } from 'src/app/common/services';
import { ArrayUtil } from 'src/app/common/utils';
import { LocaleKeys } from 'src/app/common/constants';
import { ActionButtonConfig } from './action-button';
import { AnimationType } from './animation-player';
import { GridItemSkeletonType } from './skeletons/grid-item-skeleton';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseGridViewComponent<T> {
  @ViewChild(MatMenuTrigger) 
  optionMenu!: MatMenuTrigger;

  @Input('dataSource$')
  dataSource$!: Observable<T[]>;

  @Input('isLoading$')
  isLoading$!: Observable<boolean>;

  viewButton$!: BehaviorSubject<ActionButtonConfig>;
  deleteButton$!: BehaviorSubject<ActionButtonConfig>;

  defaultLoadingItems = ArrayUtil.createFakeArray(25);
  GridItemSkeletonType = GridItemSkeletonType;
  AnimationType = AnimationType;
  LocaleKeys = LocaleKeys;

  constructor(protected actionSvc: ActionService) { 
    this.initializeButtons();
  }

  protected abstract initializeButtons(): void;

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
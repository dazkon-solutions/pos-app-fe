/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */


import { 
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, 
  OnDestroy, 
  OnInit, 
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CdkTree } from '@angular/cdk/tree';
import { 
  firstValueFrom,
  Observable,
  Subject, 
  takeUntil 
} from 'rxjs';
import { 
  MenuState,
  LeftPanelState,
  SelectMenuItem,
  MenuNode,
  ToggleLeftPanel,
  SetMenuParent
} from 'src/app/store';
import { SubscriptionHelper } from 'src/app/common/helpers';
import { Resource } from 'src/app/common/enums';
import { Navigator } from 'src/app/common/services';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { BottomMenuNode } from './bottom-menu.interface';
import { BottomMenuConfigHelper } from './bottom-menu-config.helper';


@Component({
  selector: 'daz-bottom-menu',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './bottom-menu.component.html',
  styleUrl: './bottom-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomMenuComponent implements 
  OnInit,
  AfterViewInit,
  OnDestroy
{
  @ViewChild(CdkTree)
  tree!: CdkTree<BottomMenuNode>;
  
  dataSource = BottomMenuConfigHelper.createBottomMenu();
  isLeftPanelExpanded = false;
  
  private destroy$ = new Subject<void>();

  childrenAccessor = (node: BottomMenuNode) => [];

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    await this.syncState();
    this.init();
  }

  ngAfterViewInit(): void {
    this.store.select(LeftPanelState.isExpanded)
      .pipe(takeUntil(this.destroy$))
      .subscribe(panel => {
        this.isLeftPanelExpanded = panel;
        this.cdr.detectChanges();
      });
  }

  
  private async syncState(): Promise<void> {
    // this.current$ = this.store.select(MenuState.getCurrent);

    // this.store.select(MenuState.getTree)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(list => {
    //     this.dataSource = list;
    //     this.setFlattenedIfNotExist(list);
    //   });
  }

  private init(): void {
    // this.navigateSvc.navigator$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(resource => this.navigateToResource(resource));
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}
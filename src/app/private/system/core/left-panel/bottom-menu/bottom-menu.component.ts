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
  DestroyRef, 
  OnInit, 
  ViewChild
} from '@angular/core';
import { Store } from '@ngxs/store';
import { CdkTree } from '@angular/cdk/tree';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeftPanelState } from 'src/app/store/left-panel-config';
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
  AfterViewInit
{
  @ViewChild(CdkTree)
  tree!: CdkTree<BottomMenuNode>;
  
  dataSource = BottomMenuConfigHelper.createBottomMenu();
  isLeftPanelExpanded = false;
  
  childrenAccessor = (node: BottomMenuNode) => [];

  constructor(
    private destroyRef: DestroyRef,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    //
  }

  ngAfterViewInit(): void {
    this.store.select(LeftPanelState.isExpanded)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(panel => {
        this.isLeftPanelExpanded = panel;
        this.cdr.detectChanges();
      });
  }
}
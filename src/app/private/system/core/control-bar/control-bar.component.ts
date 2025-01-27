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
  OnDestroy, 
  OnInit
} from '@angular/core';
import { 
  Observable,
  Subject
} from 'rxjs';
import { Store } from '@ngxs/store';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { 
  MenuNode,
  MenuState
} from 'src/app/store';
import { LocaleKeys } from 'src/app/common/constants';
import { SubscriptionHelper } from 'src/app/common/helpers';
import { MainSearchComponent } from '../main-search/main-search.component';


@Component({
  selector: 'daz-control-bar',
  imports: [
    StandaloneCommonModule,
    MaterialModule,
    MainSearchComponent
  ],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent implements 
  OnInit,
  OnDestroy  
{
  menuCurrent$!: Observable<MenuNode | null>;
  LocaleKeys = LocaleKeys;

  private destroy$ = new Subject<void>();
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.syncState();
  }
  
  private syncState(): void {
    this.menuCurrent$ = this.store.select(MenuState.getCurrent);
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}
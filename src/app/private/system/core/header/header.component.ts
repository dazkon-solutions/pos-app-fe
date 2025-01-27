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
  MainSearchConfig, 
  ToggleLeftPanel,
  ToggleTheme,
  MenuNode,
  MenuState
} from 'src/app/store';
import { LocaleKeys } from 'src/app/common/constants';
import { SubscriptionHelper } from 'src/app/common/helpers';
import { ThemeService } from 'src/app/common/services';


@Component({
  selector: 'daz-header',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements 
  OnInit,
  OnDestroy  
{
  menuParentItem$!: Observable<MenuNode | null>;
  searchConfig$!: Observable<MainSearchConfig | null>;
  isLightTheme$!: Observable<boolean>;
  LocaleKeys = LocaleKeys;
  isFullScreen = false;
  username = 'samantha';
  role = 'ADMIN';

  private destroy$ = new Subject<void>();
  
  constructor(
    private store: Store,
    private themeSvc: ThemeService
  ) { }

  ngOnInit(): void {
    this.init();
  }
  
  private init(): void {
    this.syncState();
    
    this.isLightTheme$ = this.themeSvc.isLightTheme$();
  }

  private syncState(): void {
    this.menuParentItem$ = this.store.select(MenuState.getParent);
  }

  onClickNotifications(): void {
    // this.notificationPanelSvc.openPanel();
  }

  onToggleLeftPanel(): void {
    this.store.dispatch(new ToggleLeftPanel());
  }

  onToggleTheme(): void {
    this.store.dispatch(new ToggleTheme());
  }

  getUsername(type: 'SHORT' | 'FULL'): string {
    return type === 'SHORT'
      ? `${this.username.charAt(0)}${this.username.charAt(1)}`
      : this.username;
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}
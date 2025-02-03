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
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { ToggleLeftPanel } from 'src/app/store/left-panel-config';
import { LocaleKeys } from 'src/app/common/constants';
import { ThemeService } from 'src/app/common/services';
import { ToggleTheme } from 'src/app/store/appearance';
import { MainSearchConfig } from 'src/app/store/main-search';
import { 
  MenuNode, 
  MenuState 
} from 'src/app/store/menu-config';


@Component({
  selector: 'daz-header',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuParentItem$!: Observable<MenuNode | null>;
  searchConfig$!: Observable<MainSearchConfig | null>;
  isLightTheme$!: Observable<boolean>;
  LocaleKeys = LocaleKeys;
  isFullScreen = false;
  username = 'samantha';
  role = 'ADMIN';

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
}
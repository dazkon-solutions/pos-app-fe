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
  inject
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { ToggleLeftPanel } from 'src/app/store/left-panel-config';
import { LocaleKeys } from 'src/app/common/constants';
import { ToggleTheme } from 'src/app/store/appearance';
import { MainSearchConfig } from 'src/app/store/main-search';
import { MenuState } from 'src/app/store/menu-config';

@Component({
  selector: 'daz-header',
  imports: [
    CORE_IMPORTS,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatRippleModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private store = inject(Store);
  private router = inject(Router);

  menuParentItem = this.store.selectSignal(MenuState.getParent);

  searchConfig$!: Observable<MainSearchConfig | null>;
  isLightTheme$!: Observable<boolean>;

  LocaleKeys = LocaleKeys;
  isFullScreen = false;
  username = 'samantha';
  role = 'ADMIN';

  onClickNotifications(): void {
    // this.notificationPanelSvc.openPanel();
  }

  onToggleLeftPanel(): void {
    this.store.dispatch(new ToggleLeftPanel());
  }

  onToggleTheme(): void {
    this.store.dispatch(new ToggleTheme());
  }

  onClickPos(): void {
    this.router.navigate(['pos']);
  }

  getUsername(type: 'SHORT' | 'FULL'): string {
    return type === 'SHORT'
      ? `${this.username.charAt(0)}${this.username.charAt(1)}`
      : this.username;
  }
}
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
  effect, 
  inject, 
  OnInit 
} from '@angular/core';
import { 
  Router, 
  RouterOutlet 
} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { 
  ControlBarComponent,
  HeaderComponent, 
  LeftPanelComponent
} from 'src/app/private/system/core';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { IconService } from './common/services';
import { Resource } from './common/enums';
import { MenuConfigService } from './store/menu-config';
import { LeftPanelState } from './store/left-panel-config';
import { SnackBarAlertService } from './private/system/common/snack-bar-alert/snack-bar-alert.service';
import { 
  Alert,
  AlertMode, 
  AlertState 
} from './store/alerts';
import { NavigationState } from './store/navigation-config';
import { ControlBarService } from './private/system/core/control-bar';
import { RoutePaths } from './common/navigation';
import { AppearanceState } from './store/appearance';

@Component({
  selector: 'daz-root',
  imports: [
    RouterOutlet,
    CORE_IMPORTS,
    MatSidenavModule,
    HeaderComponent,
    LeftPanelComponent,
    ControlBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  private controlBarSvc = inject(ControlBarService);
  private translate = inject(TranslateService);
  private iconSvc = inject(IconService);
  private menuConfigSvc = inject(MenuConfigService);
  private snackBarAlertSvc = inject(SnackBarAlertService);
  private router = inject(Router);

  isLeftPanelExpanded = this.store.selectSignal(LeftPanelState.isExpanded);
  currentResource = this.store.selectSignal(NavigationState.getCurrentResource);
  newAlert = this.store.selectSignal(AlertState.getNew);
  isLightTheme = this.store.selectSignal(AppearanceState.isLightTheme);
  isAuth = true;

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.iconSvc.registerSvgIcons();

    effect(() => this.subscribeToAlerts(this.newAlert()));
  }

  ngOnInit(): void {
    this.menuConfigSvc.createMenuTreeByPermission(); // TODO: REMOVE
  }

  private subscribeToAlerts(alert: Alert): void {
    if (alert?.mode === AlertMode.SNACK_BAR) {
      this.snackBarAlertSvc.open(alert);
    }
  }

  isVisibleControlBar(resource: Resource | null): boolean {
    if (!resource) return false;
    return this.controlBarSvc.isVisible(resource);
  }

  isPosRoute(): boolean {
    return this.router.url === `/${RoutePaths.POS_PAGE}`;
  }
}
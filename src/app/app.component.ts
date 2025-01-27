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
  Component, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { 
  ControlBarComponent,
  FooterComponent, 
  HeaderComponent, 
  LeftPanelComponent,
  RightPanelComponent
} from 'src/app/private/system/core';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from './common/modules';
import { 
  IconService, 
  ThemeService 
} from './common/services';
import { 
  LeftPanelState, 
  MenuNode, 
  MenuState, 
  RightPanelState 
} from './store';
import { MenuConfigService } from './store/menu-config/menu-config.service';
import { Resource } from './common/enums';

@Component({
  selector: 'daz-root',
  imports: [
    RouterOutlet,
    StandaloneCommonModule,
    MaterialModule,
    HeaderComponent,
    LeftPanelComponent,
    RightPanelComponent,
    FooterComponent,
    ControlBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements 
  OnInit,
  AfterViewInit
{
  @ViewChild('rightPanel') 
  rightPanel!: MatDrawer;
  
  isLightTheme$!: Observable<boolean>;
  isLeftPanelExpanded$!: Observable<boolean>;
  menuCurrent$!: Observable<MenuNode | null>;
  isAuth = true;

  constructor(
    private translate: TranslateService,
    private iconSvc: IconService,
    private menuConfigSvc: MenuConfigService,
    private themeSvc: ThemeService,
    private store: Store,
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.iconSvc.registerSvgIcons();
  }

  ngOnInit(): void {
    this.init();
    this.syncState();
    this.menuConfigSvc.createMenuTreeByPermission(); // TODO: REMOVE
  }

  ngAfterViewInit(): void {
    this.store.select(RightPanelState.isExpanded)
      .subscribe(isExpanded => isExpanded 
        ? this.rightPanel.open() 
        : this.rightPanel.close());
  }

  private init(): void {
    this.isLightTheme$ = this.themeSvc.isLightTheme$();
  }

  private syncState(): void {
    this.isLeftPanelExpanded$ = this.store.select(LeftPanelState.isExpanded);
    this.menuCurrent$ = this.store.select(MenuState.getCurrent);
  }

  isVisibleControlBar(resource: Resource | null): boolean {
    if(!resource) return false;

    const avoidResources = [ 
      Resource.DASHBOARD,
      Resource.NONE
    ];

    return !avoidResources.includes(resource);
  }
}
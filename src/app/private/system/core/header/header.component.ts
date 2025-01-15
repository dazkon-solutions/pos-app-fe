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
  Subject,
  takeUntil
} from 'rxjs';
import { Store } from '@ngxs/store';
import { NavigationConfig } from 'src/app/common/interfaces';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
// import { NotificationPanelService } from 'src/app/private/system/core';
import { 
  MainSearchConfig, 
  MainSearchState, 
  NavigationState, 
  DeactivateMainSearchFilter, 
  SetMainSearchByResource
} from 'src/app/store';
import { LocaleKeys } from 'src/app/common/constants';
import { SubscriptionHelper } from 'src/app/common/helpers';
import { MainSearchComponent } from '../main-search/main-search.component';


@Component({
  selector: 'daz-header',
  standalone: true,
  imports: [
    StandaloneCommonModule,
    MaterialModule,
    MainSearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements 
  OnInit,
  OnDestroy  
{
  currentNav$!: Observable<NavigationConfig>;
  searchConfig$!: Observable<MainSearchConfig | null>;
  LocaleKeys = LocaleKeys;

  profileAvatar = 'https://randomuser.me/api/portraits/thumb/men/75.jpg';

  private destroy$ = new Subject<void>();
  
  constructor(
    private store: Store,
    // private notificationPanelSvc: NotificationPanelService
  ) { }

  ngOnInit(): void {
    this.syncState();
  }

  private syncState(): void {
    this.currentNav$ = this.store.select(NavigationState.getCurrentParent);
    this.searchConfig$ = this.store.select(MainSearchState.getConfig);

    this.store.select(NavigationState.getResource)
      .pipe(takeUntil(this.destroy$))
      .subscribe(resource => 
        this.store.dispatch([
          new SetMainSearchByResource(resource),
          new DeactivateMainSearchFilter()
        ]));
  }

  onClickNotifications(): void {
    // this.notificationPanelSvc.openPanel();
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}
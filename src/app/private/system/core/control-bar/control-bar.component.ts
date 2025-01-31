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
import { SubscriptionHelper } from 'src/app/common/helpers';
import { Resource } from 'src/app/common/enums';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { MainSearchComponent } from '../main-search/main-search.component';


@Component({
  selector: 'daz-control-bar',
  imports: [
    StandaloneCommonModule,
    MaterialModule,
    MainSearchComponent,
    ActionButtonComponent
  ],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent implements 
  OnInit,
  OnDestroy  
{
  menuCurrent$!: Observable<MenuNode | null>;
  addNewButtonConfig: ActionButtonConfig = {
    type: ActionButtonType.ADD,
    isDisabled: true,
    resource: Resource.NONE
  }

  private destroy$ = new Subject<void>();
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.syncState();
  }
  
  private syncState(): void {
    this.menuCurrent$ = this.store.select(MenuState.getCurrent);
  }

  setAddButtonConfig(menuCurrent: MenuNode | null): ActionButtonConfig {
    if(!menuCurrent) return this.addNewButtonConfig;

    return {
      ...this.addNewButtonConfig,
      resource: menuCurrent.resource
    };
  }

  addNewButtonClickHandle(resource: Resource): void {
    console.warn('add new', resource);
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}
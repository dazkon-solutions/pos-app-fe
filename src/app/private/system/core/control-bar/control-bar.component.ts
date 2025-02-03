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
  DestroyRef, 
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { 
  MenuNode,
  MenuState
} from 'src/app/store/menu-config';
import { Resource } from 'src/app/common/enums';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { ActionResponse } from 'src/app/common/interfaces';
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
export class ControlBarComponent implements OnInit {
  addNewButtonConfig$ = new BehaviorSubject<ActionButtonConfig>({
    type: ActionButtonType.ADD,
    resource: Resource.NONE
  });
  menuCurrent!: MenuNode | null;

  constructor(
    private destroyRef: DestroyRef,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.syncState();
  }
  
  private syncState(): void {
    this.store.select(MenuState.getCurrent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(current => {
        this.menuCurrent = current;

        if(current) { 
          this.setAddButtonConfig(current.resource);
        }
      });
  }

  setAddButtonConfig(resource: Resource): void {
    this.addNewButtonConfig$.next({
      type: ActionButtonType.ADD,
      resource
    });
  }

  addNewButtonClickHandle(actionResponse: ActionResponse): void {
    console.warn('add new', actionResponse.data.resource);
  }
}
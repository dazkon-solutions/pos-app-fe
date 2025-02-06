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
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { 
  MenuNode,
  MenuState
} from 'src/app/store/menu-config';
import { Action } from 'src/app/common/enums';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { ActionService } from 'src/app/common/services';
import { MainSearchComponent } from '../main-search/main-search.component';
import { CONTROL_BAR_MAT_IMPORTS } from './control-bar-imports';


@Component({
  selector: 'daz-control-bar',
  imports: [
    CORE_IMPORTS,
    CONTROL_BAR_MAT_IMPORTS,
    MainSearchComponent,
    ActionButtonComponent
  ],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent implements OnInit {
  addNewButtonConfig$ = new BehaviorSubject<ActionButtonConfig>({
    type: ActionButtonType.ADD,
    action: Action.NONE
  });
  menuCurrent!: MenuNode | null;

  constructor(
    private destroyRef: DestroyRef,
    private store: Store,
    private actionSvc: ActionService
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
          this.setAddButtonConfig(current.action);
        }
      });
  }

  private setAddButtonConfig(action: Action): void {
    this.addNewButtonConfig$.next({
      type: ActionButtonType.ADD,
      action
    });
  }

  addNewButtonClickHandle(action: Action): void {
    this.actionSvc.emitAction({ 
      action,
      payload: { }
    });
  }
}